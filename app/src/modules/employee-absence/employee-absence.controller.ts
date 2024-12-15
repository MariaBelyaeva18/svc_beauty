import { Controller, Post, Body, Put, Get, Query } from '@nestjs/common';
import { EmployeeAbsenceCreateDto } from './dto/employee-absence.create.dto';
import { EmployeeAbsenceGetListDto } from './dto/employee-absence.getList.dto';
import { EmployeeAbsenceUpdateDto } from './dto/employee-absence.update.dto';
import { EmployeeAbsenceGetListResponseDto } from './dto/responses/employee-absence.getList.response.dto';
import { EmployeeAbsenceService } from './employee-absence.service';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Controller('employee-absence')
export class EmployeeAbsenceController {
  constructor(private readonly employeeAbsenceService: EmployeeAbsenceService) {}

  @Post()
  create(@Body() dto: EmployeeAbsenceCreateDto): PromiseResponseDto {
    return this.employeeAbsenceService.create(dto);
  }

  @Put()
  update(@Body() dto: EmployeeAbsenceUpdateDto): PromiseResponseDto {
    return this.employeeAbsenceService.update(dto);
  }

  @Get('list')
  getList(
    @Query() dto: EmployeeAbsenceGetListDto,
  ): PromiseResponseDto<EmployeeAbsenceGetListResponseDto[]> {
    return this.employeeAbsenceService.getList(dto);
  }
}
