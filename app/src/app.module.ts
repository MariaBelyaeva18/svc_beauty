import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { sequelizeConfig } from './sequelize/sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), AuthModule, RolesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
