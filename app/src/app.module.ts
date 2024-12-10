import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { sequelizeConfig } from './sequelize/sequelize.config';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), AuthModule, RolesModule, UsersModule, StorageModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
