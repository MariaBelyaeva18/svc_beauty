import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServicesModule } from './modules/services/services.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/users.module';
import { sequelizeConfig } from './sequelize/sequelize.config';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    AuthModule,
    RolesModule,
    UsersModule,
    StorageModule,
    ServicesModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
