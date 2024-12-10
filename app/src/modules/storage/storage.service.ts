import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { StorageGetListDtoResponse } from './dto/responses/storage.getList.dto.response';
import { StorageCreateMaterialDto } from './dto/storage.createMaterial.dto';
import { StorageGetListDto } from './dto/storage.getList.dto';
import { StorageRepository } from './storage.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly storageRepository: StorageRepository,
  ) {}

  /** Создание новой позиции на складе */
  async createMaterial(dto: StorageCreateMaterialDto) {
    await this.sequelize.models.StorageModel.create({
      material_name: dto.materialName,
      amount: dto.amount,
    });

    return {
      message: 'Материал успешно создан',
    };
  }

  /** Получение списка материалов со склада */
  async getList(dto: StorageGetListDto): PromiseResponseDto<StorageGetListDtoResponse> {
    const data = await this.storageRepository.getList(dto);

    return {
      data,
      message: 'Список материалов на складе успешно получен',
    };
  }
}
