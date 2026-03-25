import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import usersSchema from './schemas/users.schema';
import { UsersService } from './users.service';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserInfo(@Param('id') id: string) {
    return this.usersService.getUserInfo(id);
  }

  @Patch(':userId')
  updateUserInfo(
    @Param('userId') userId: string,
    @Body(new JoiObjectValidationPipe(usersSchema.update, VALIDATION_ERROR)) dto: any,
  ) {
    return this.usersService.updateUserInfo(userId, dto);
  }

  @Post('avatar/:userId')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  updateAvatar(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: string) {
    return this.usersService.updateAvatar(userId, file);
  }
}
