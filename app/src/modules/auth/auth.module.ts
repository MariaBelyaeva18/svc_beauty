import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokenService } from '../../common/jwt/jwt.service';

@Module({
  controllers: [AuthController],
  imports: [],
  providers: [AuthService, JwtTokenService],
  exports: [AuthService, JwtTokenService],
})
export class AuthModule {}
