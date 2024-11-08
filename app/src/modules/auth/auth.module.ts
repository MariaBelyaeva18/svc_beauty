import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresModule } from '../postgres/postgres.module';

@Module({
  controllers: [AuthController],
  imports: [PostgresModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
