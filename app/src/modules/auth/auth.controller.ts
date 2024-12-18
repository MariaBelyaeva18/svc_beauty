import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async checkUser(@Body() param: { username: string; password: string }) {
    return this.authService.checkUser(param);
  }

  @Post('/register')
  async registerUser(@Body() dto) {
    return this.authService.registerUser(dto);
  }
}
