import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { StorageGetListDtoResponse } from './dto/responses/storage.getList.dto.response';
import { StorageCreateMaterialDto } from './dto/storage.createMaterial.dto';
import { StorageGetListDto } from './dto/storage.getList.dto';
import { StorageService } from './storage.service';
import { StorageUpdateMaterialDto } from './storage.updateMaterial.dto';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  createMaterial(@Body() dto: StorageCreateMaterialDto): PromiseResponseDto {
    return this.storageService.createMaterial(dto);
  }

  @Get('list')
  getList(@Query() dto: StorageGetListDto): PromiseResponseDto<StorageGetListDtoResponse> {
    return this.storageService.getList(dto);
  }

  @Patch()
  updateMaterial(@Body() dto: StorageUpdateMaterialDto): PromiseResponseDto {
    return this.storageService.updateMaterial(dto);
  }
}
