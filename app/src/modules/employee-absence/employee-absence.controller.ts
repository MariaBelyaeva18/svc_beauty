import { Controller, Post, Body, Put, Get, Query, Delete, Param } from '@nestjs/common';
import { EmployeeAbsenceCreateDto } from './dto/employee-absence.create.dto';
import { EmployeeAbsenceGetListDto } from './dto/employee-absence.getList.dto';
import { EmployeeAbsenceUpdateDto } from './dto/employee-absence.update.dto';
import { EmployeeAbsenceGetListResponseDto } from './dto/responses/employee-absence.getList.response.dto';
import { EmployeeAbsenceService } from './employee-absence.service';
import employeeAbsenceSchema from './schemas/employee-absence.schema';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';

@Controller('employee-absence')
export class EmployeeAbsenceController {
  constructor(private readonly employeeAbsenceService: EmployeeAbsenceService) {}

  @Post()
  create(
    @Body(new JoiObjectValidationPipe(employeeAbsenceSchema.create, VALIDATION_ERROR))
    dto: EmployeeAbsenceCreateDto,
  ): PromiseResponseDto {
    return this.employeeAbsenceService.create(dto);
  }

  @Put()
  update(
    @Body(new JoiObjectValidationPipe(employeeAbsenceSchema.update, VALIDATION_ERROR))
    dto: EmployeeAbsenceUpdateDto,
  ): PromiseResponseDto {
    return this.employeeAbsenceService.update(dto);
  }

  @Get('list')
  getList(
    @Query() dto: EmployeeAbsenceGetListDto,
  ): PromiseResponseDto<EmployeeAbsenceGetListResponseDto[]> {
    return this.employeeAbsenceService.getList(dto);
  }

  @Put('/:id')
  delete(@Param('id') id: string): PromiseResponseDto {
    return this.employeeAbsenceService.delete(id);
  }
}
