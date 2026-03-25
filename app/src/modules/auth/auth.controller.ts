import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import authSchema from './schemas/auth.schema';
import { Public } from '../../common/auth/public.decorator';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async checkUser(
    @Body(new JoiObjectValidationPipe(authSchema.login, VALIDATION_ERROR))
    param: {
      username: string;
      password: string;
    },
  ) {
    return this.authService.checkUser(param);
  }

  @Post('/register')
  async registerUser(@Body(new JoiObjectValidationPipe(authSchema.create, VALIDATION_ERROR)) dto) {
    return this.authService.registerUser(dto);
  }
}
