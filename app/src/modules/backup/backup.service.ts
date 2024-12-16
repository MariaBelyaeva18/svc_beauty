import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor() {
    /** Если так не сделать, то в command нужно будет вводить пароль */
    process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;

    if (!fs.existsSync('./backups')) {
      fs.mkdir('./backups', (error) => {
        console.error('Ошибка в создании директории: ', error);
      });
    }
  }

  /** Создание бэкапа */
  async createBackup(): PromiseResponseDto {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `./backups/backup-${timestamp}.sql`;

    /** Используем имя контейнера PostgreSQL в качестве хоста */
    const command = `pg_dump -U ${process.env.POSTGRES_USER} -h postgres -d ${process.env.POSTGRES_DB} -f ${backupPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`Ошибка в создании бэкапа: ${stderr}`);
      } else {
        this.logger.log(`Бэкап создан ${backupPath}`);
      }
    });

    return {
      message: 'Бэкап успешно создан',
    };
  }

  /** Восстановление из бэкапа */
  async restoreBackup(backupFile: string) {
    const backupFilePath = `./backups/${backupFile}`;
    /** Проверка, существует ли файл бэкапа */
    if (!fs.existsSync(backupFilePath)) {
      this.logger.error(`Бэкап файл не найден: ${backupFilePath}`);
      return;
    }

    const command = `psql -U ${process.env.POSTGRES_USER} -h postgres -d ${process.env.POSTGRES_DB} -f ${backupFilePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`Ошибка во время восстановления : ${stderr}`);
      } else {
        this.logger.log(`Данные восстановлены из файла ${backupFilePath}`);
      }
    });
  }

  /** Планировщик: запуск бэкапа раз в день в 3:00 */
  @Cron('0 3 * * *')
  async handleDailyBackup() {
    this.logger.log('Ежедневный бэкап');
    await this.createBackup();
  }
}
