import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EmployeeCreateDto } from './dto/employee.create.dto';
import { EmployeeGetListDto } from './dto/employee.getList.dto';
import { EmployeeUpdateDto } from './dto/employee.update.dto';
import { EmployeeGetDetailInfoDtoResponse } from './dto/responses/employee.getDetailInfo.dto.response';
import { EmployeeGetListDtoResponse } from './dto/responses/employee.getList.dto.response';
import { EmployeeService } from './employee.service';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('list')
  getList(@Query() dto: EmployeeGetListDto): PromiseResponseDto<EmployeeGetListDtoResponse> {
    return this.employeeService.getList(dto);
  }

  @Get('detail/:masterId')
  getDetailInfo(
    @Param('masterId') masterId: string,
  ): PromiseResponseDto<EmployeeGetDetailInfoDtoResponse> {
    return this.employeeService.getDetailInfo(masterId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body('data') dto: string) {
    // Преобразуем строку JSON в объект
    const parsedDto = JSON.parse(dto);

    // Преобразуем в экземпляр DTO
    const updatedDto = plainToInstance(EmployeeCreateDto, parsedDto);

    // Валидируем DTO
    const errors = await validate(updatedDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.employeeService.create(updatedDto, file);
  }

  @Put()
  update(@Body() dto: EmployeeUpdateDto): PromiseResponseDto {
    return this.employeeService.update(dto);
  }

  @Delete('/:masterId')
  delete(@Param('masterId') masterId: string): PromiseResponseDto {
    return this.employeeService.delete(masterId);
  }
}
