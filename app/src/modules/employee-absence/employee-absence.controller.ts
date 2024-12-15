import { Controller, Post, Body, Put, Get, Query } from '@nestjs/common';
import { EmployeeAbsenceCreateDto } from './dto/employee-absence.create.dto';
import { EmployeeAbsenceGetListDto } from './dto/employee-absence.getList.dto';
import { EmployeeAbsenceUpdateDto } from './dto/employee-absence.update.dto';
import { EmployeeAbsenceService } from './employee-absence.service';

@Controller('employee-absence')
export class EmployeeAbsenceController {
  constructor(private readonly employeeAbsenceService: EmployeeAbsenceService) {}

  @Post()
  create(@Body() dto: EmployeeAbsenceCreateDto) {
    return this.employeeAbsenceService.create(dto);
  }

  @Put()
  update(@Body() dto: EmployeeAbsenceUpdateDto) {
    return this.employeeAbsenceService.update(dto);
  }
}
