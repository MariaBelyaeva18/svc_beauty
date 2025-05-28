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
import employeeSchema from './schemas/employee.schema';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';
import { JsonParsePipe } from '../../pipes/JsonParse.pipe';
import employeeAbsenceSchema from '../employee-absence/schemas/employee-absence.schema';

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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data', new JsonParsePipe()) data: EmployeeCreateDto,
  ) {
    const pipe = new JoiObjectValidationPipe(employeeSchema.create, VALIDATION_ERROR);
    const validatedData = await pipe.transform(data, { type: 'body' });

    // Преобразуем в экземпляр DTO
    const updatedDto = plainToInstance(EmployeeCreateDto, validatedData);

    return this.employeeService.create(updatedDto, file);
  }

  @Put()
  update(
    @Body(new JoiObjectValidationPipe(employeeSchema.update, VALIDATION_ERROR))
    dto: EmployeeUpdateDto,
  ): PromiseResponseDto {
    return this.employeeService.update(dto);
  }

  @Delete('/:masterId')
  delete(@Param('masterId') masterId: string): PromiseResponseDto {
    return this.employeeService.delete(masterId);
  }
}
