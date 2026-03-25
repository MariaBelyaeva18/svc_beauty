import { Controller, Get, Query } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupRestoreDto } from './dto/backup.restore.dto';

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
  async restoreBackup(@Query() dto: BackupRestoreDto) {
    return this.backupService.restoreBackup(dto.backupFile);
  }
}
