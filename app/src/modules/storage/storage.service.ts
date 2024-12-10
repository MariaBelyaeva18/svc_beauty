import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { StorageCreateMaterialDto } from './dto/storage.createMaterial.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Создание новой позиции на складе */
  async createMaterial(dto: StorageCreateMaterialDto) {
    await this.sequelize.models.StorageModel.create({
      material_name: dto.materialName,
      amount: dto.amount,
    });
  }
}
