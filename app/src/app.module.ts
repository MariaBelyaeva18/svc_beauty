import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresModule } from './modules/postgres/postgres.module';

@Module({
  imports: [AuthModule, PostgresModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
