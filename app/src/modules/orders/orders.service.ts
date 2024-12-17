import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { OrdersCreateDto } from './dto/orders.create.dto';
import { OrdersGetListDto } from './dto/orders.getList.dto';
import { OrdersGetMastersListDto } from './dto/orders.getMastersList.dto';
import { OrdersUpdateDto } from './dto/orders.update.dto';
import { OrdersGetMastersListResponseDto } from './dto/responses/orders.getMastersList.response.dto';
import { OrdersRepository } from './orders.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  /** Создание заказа */
  async create(dto: OrdersCreateDto): PromiseResponseDto {
    await this.sequelize.models.OrdersModel.create({
      execution_date: dto.executionDate,
      service_id: dto.serviceId,
      client_id: dto.clientId,
      master_id: dto.masterId,
      description: dto.description,
      status_id: 'created',
    });

    return {
      message: 'Заказ успешно создан',
    };
  }

  /** Обновление заказа */
  async update(dto: OrdersUpdateDto): PromiseResponseDto {
    await this.sequelize.models.OrdersModel.update(
      {
        execution_date: dto.executionDate,
        service_id: dto.serviceId,
        client_id: dto.clientId,
        master_id: dto.masterId,
        description: dto.description,
        status_id: 'created',
      },
      {
        where: {
          id: dto.id,
        },
      },
    );

    return {
      message: 'Заказ успешно обновлен',
    };
  }

  /** Получение списка заказов */
  async getList(dto: OrdersGetListDto): PromiseResponseDto {
    const data = await this.ordersRepository.getList(dto);

    return {
      message: 'Список заказов успешно получен',
    };
  }

  /** Получение списка доступных мастеров */
  async getMastersList(
    dto: OrdersGetMastersListDto,
  ): PromiseResponseDto<OrdersGetMastersListResponseDto[]> {
    const data = await this.ordersRepository.getMastersList(dto);
    return {
      data,
      message: 'Список доступных мастеров успешно получен',
    };
  }
}
