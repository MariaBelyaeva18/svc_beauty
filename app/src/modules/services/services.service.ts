import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { ServicesGetListDtoResponse } from './dto/responses/services.getList.dto.response';
import { ServicesCreateDto } from './dto/services.create.dto';
import { ServicesUpdateDto } from './dto/services.update.dto';
import { ServicesRepository } from './services.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { StorageGetListDto } from '../storage/dto/storage.getList.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  /** Получение списка услуг */
  async getList(dto: StorageGetListDto): PromiseResponseDto<ServicesGetListDtoResponse> {
    const data = await this.servicesRepository.getList(dto);

    return {
      data,
      message: 'Список услуг успешно получен',
    };
  }

  /** Создание услуги */
  async create(dto: ServicesCreateDto) {
    await this.sequelize.models.ServicesModel.create({
      name: dto.name,
      description: dto.description,
      cost: dto.cost,
      duration: dto.duration,
    });

    return {
      message: 'Услуга успешно создана',
    };
  }

  /** Обновление услуги */
  async update(dto: ServicesUpdateDto): PromiseResponseDto {
    await this.sequelize.models.ServicesModel.update(
      {
        name: dto.name,
        description: dto.description,
        cost: dto.cost,
        duration: dto.duration,
      },
      {
        where: {
          id: dto.id,
        },
      },
    );

    return {
      message: 'Услуга успешно обновлена',
    };
  }

  /** Удаление услуги */
  async delete(serviceId: string): PromiseResponseDto {
    await this.sequelize.models.ServicesModel.destroy({
      where: {
        id: serviceId,
      },
    });

    return {
      message: 'Услуга успешно удалена',
    };
  }
}
