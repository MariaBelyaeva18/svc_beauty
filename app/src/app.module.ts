import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [AuthModule, RolesModule, PostgresModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
