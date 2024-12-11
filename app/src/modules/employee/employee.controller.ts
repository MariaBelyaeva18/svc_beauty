import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { EmployeeCreateDto } from './dto/employee.create.dto';
import { EmployeeGetListDto } from './dto/employee.getList.dto';
import { EmployeeUpdateDto } from './dto/employee.update.dto';
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

  @Post()
  create(@Body() createServiceDto: EmployeeCreateDto) {
    return this.employeeService.create(createServiceDto);
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
