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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserInfo(@Param('id') id: string) {
    return this.usersService.getUserInfo(id);
  }

  @Patch(':userId')
  updateUserInfo(@Param('userId') userId: string, @Body() dto: any) {
    return this.usersService.updateUserInfo(userId, dto);
  }

  @Post('avatar/:userId')
  @UseInterceptors(FileInterceptor('file', {}))
  updateAvatar(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: string) {
    return this.usersService.updateAvatar(userId, file);
  }
}
