import { IsNotEmpty, IsString } from 'class-validator';

export class BackupRestoreDto {
  @IsNotEmpty()
  @IsString()
  backupFile: string;
}
