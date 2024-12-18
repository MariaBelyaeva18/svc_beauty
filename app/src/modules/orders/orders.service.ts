import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { createReadStream } from 'fs';
import * as path from 'node:path';
import { OrdersCreateDto } from './dto/orders.create.dto';
import { OrdersGetListDto } from './dto/orders.getList.dto';
import { OrdersGetMastersListDto } from './dto/orders.getMastersList.dto';
import { OrdersUpdateDto } from './dto/orders.update.dto';
import { OrdersGetListResponseDto } from './dto/responses/orders.getList.response.dto';
import { OrdersGetMastersListResponseDto } from './dto/responses/orders.getMastersList.response.dto';
import { OrdersRepository } from './orders.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { orderStatuses } from '../../sequelize/models/statuses.model';

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
  async getList(dto: OrdersGetListDto): PromiseResponseDto<OrdersGetListResponseDto> {
    const data = await this.ordersRepository.getList(dto);

    return {
      data: {
        data: data.data.map((item) => ({
          id: item.id,
          executionDate: item.executionDate,
          service: {
            id: item.serviceId,
            name: item.serviceName,
          },
          client: {
            id: item.clientId,
            name: item.clientName,
          },
          master: {
            id: item.masterId,
            name: item.masterName,
          },
          description: item.description,
          status: item.status,
        })),
        count: data.count,
      },
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

  /** Смена статуса заказа */
  async changeOrderStatus(orderId: string, status: orderStatuses): PromiseResponseDto {
    await this.sequelize.models.OrdersModel.update(
      {
        status_id: status,
      },
      {
        where: {
          id: orderId,
        },
      },
    );

    return {
      message: 'Статус заказа успешно изменен',
    };
  }

  /** Генерация отчета в пдф.
   *  формируем таблицу с кол-вом заказов в определенном статусе за текущий месяц
   * */
  async generatePdfReport(): Promise<StreamableFile> {
    const data = await this.ordersRepository.getStatusesForCurrentMonth();

    const fs = require('fs');
    const PDFDocument = require('pdfkit-table');

    // Данные для таблицы
    const tableArray = {
      headers: ['Statuses', 'Amount'],
      rows: data.map((item) => [item.status, item.count]),
    };

    // Путь для сохранения PDF
    const filePath = path.join(__dirname, 'report.pdf');

    // Создаем PDF документ
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    // Записываем в файл
    doc.pipe(fs.createWriteStream(filePath));

    // Создаем первую таблицу
    doc.table(tableArray, { width: 300 });

    // Заканчиваем генерацию PDF
    doc.end();

    // Создаем поток для чтения файла
    const fileStream = createReadStream(filePath);

    // Возвращаем StreamableFile
    return new StreamableFile(fileStream, {
      type: 'application/pdf',
      disposition: 'filename=report.pdf',
    });
  }
}
