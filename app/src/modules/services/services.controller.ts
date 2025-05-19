import { Controller, Post, Body, Get, Query, Delete, Param, Put, Patch } from '@nestjs/common';
import { ServicesGetListDtoResponse } from './dto/responses/services.getList.dto.response';
import { ServicesCreateDto } from './dto/services.create.dto';
import { ServicesGetListDto } from './dto/services.getList.dto';
import { ServicesUpdateDto } from './dto/services.update.dto';
import { ServicesService } from './services.service';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('list')
  getList(@Query() dto: ServicesGetListDto): PromiseResponseDto<ServicesGetListDtoResponse> {
    return this.servicesService.getList(dto);
  }

  @Post()
  create(@Body() createServiceDto: ServicesCreateDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Patch()
  update(@Body() dto: ServicesUpdateDto): PromiseResponseDto {
    return this.servicesService.update(dto);
  }

  @Delete('/:serviceId')
  delete(@Param('serviceId') serviceId: string): PromiseResponseDto {
    return this.servicesService.delete(serviceId);
  }
}
