import { Controller, Post, Body, Get, Query, Delete, Param, Put, Patch } from '@nestjs/common';
import { ServicesGetListDtoResponse } from './dto/responses/services.getList.dto.response';
import { ServicesCreateDto } from './dto/services.create.dto';
import { ServicesGetListDto } from './dto/services.getList.dto';
import { ServicesUpdateDto } from './dto/services.update.dto';
import servicesSchema from './schemas/services.schema';
import { ServicesService } from './services.service';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('list')
  getList(@Query() dto: ServicesGetListDto): PromiseResponseDto<ServicesGetListDtoResponse> {
    return this.servicesService.getList(dto);
  }

  @Post()
  create(
    @Body(new JoiObjectValidationPipe(servicesSchema.create, VALIDATION_ERROR))
    createServiceDto: ServicesCreateDto,
  ) {
    return this.servicesService.create(createServiceDto);
  }

  @Patch()
  update(
    @Body(new JoiObjectValidationPipe(servicesSchema.update, VALIDATION_ERROR))
    dto: ServicesUpdateDto,
  ): PromiseResponseDto {
    return this.servicesService.update(dto);
  }

  @Delete('/:serviceId')
  delete(@Param('serviceId') serviceId: string): PromiseResponseDto {
    return this.servicesService.delete(serviceId);
  }
}
