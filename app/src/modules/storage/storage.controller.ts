import { Controller, Post, Body } from '@nestjs/common';
import { StorageCreateMaterialDto } from './dto/storage.createMaterial.dto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  createMaterial(@Body() dto: StorageCreateMaterialDto) {
    return this.storageService.createMaterial(dto);
  }
}
