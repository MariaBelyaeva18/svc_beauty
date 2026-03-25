import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BackupModule } from './modules/backup/backup.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeAbsenceModule } from './modules/employee-absence/employee-absence.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServicesModule } from './modules/services/services.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/users.module';
import { sequelizeConfig } from './sequelize/sequelize.config';

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
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
