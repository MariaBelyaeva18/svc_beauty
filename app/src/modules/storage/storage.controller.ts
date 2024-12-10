import { Controller, Post, Body, Get, Query, Patch, Delete, Param } from '@nestjs/common';
import { StorageGetListDtoResponse } from './dto/responses/storage.getList.dto.response';
import { StorageCreateMaterialDto } from './dto/storage.createMaterial.dto';
import { StorageGetListDto } from './dto/storage.getList.dto';
import { StorageUpdateMaterialDto } from './dto/storage.updateMaterial.dto';
import { StorageService } from './storage.service';
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

  @Delete('/:materialId')
  deleteMaterial(@Param('materialId') materialId: string): PromiseResponseDto {
    return this.storageService.deleteMaterial(materialId);
  }
}
