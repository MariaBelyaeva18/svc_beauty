import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeAbsenceModule } from './modules/employee-absence/employee-absence.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServicesModule } from './modules/services/services.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/users.module';
import { sequelizeConfig } from './sequelize/sequelize.config';
import { BackupModule } from './modules/backup/backup.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    AuthModule,
    RolesModule,
    UsersModule,
    StorageModule,
    ServicesModule,
    EmployeeModule,
    EmployeeAbsenceModule,
    ScheduleModule.forRoot(),
    BackupModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
