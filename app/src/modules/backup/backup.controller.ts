import { Controller, Get, Query } from '@nestjs/common';
import { BackupService } from './backup.service';

/** Контроллер нужен исключительно для теста.
 * Бэкапы будут делаться автоматически раз в день */
@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get('create')
  async createBackup() {
    return this.backupService.createBackup();
  }

  @Get('restore')
  async restoreBackup(@Query('backupFile') backupFile: string) {
    return this.backupService.restoreBackup(backupFile);
  }
}
