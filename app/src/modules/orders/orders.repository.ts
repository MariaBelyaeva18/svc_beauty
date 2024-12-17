import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { OrdersGetListRepositoryDto } from './dto/repository/orders.getList.repository.dto';
import { OrdersGetMastersListRepositoryDto } from './dto/repository/orders.getMastersList.repository.dto';
import { OrdersGetListResponseRepositoryDto } from './dto/repository/responses/orders.getList.response.repository.dto';
import { OrdersGetMastersListResponseRepositoryDto } from './dto/repository/responses/orders.getMastersList.response.repository.dto';
import { roleTypes } from '../../sequelize/models/users.model';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка мастеров */
  async getList(dto: OrdersGetListRepositoryDto): Promise<OrdersGetListResponseRepositoryDto> {
    /** Нужно понять для какой роли делается запрос. Это влияет на выборку */
    const { roleId: userRole } = (await this.sequelize.query(
      `
        SELECT users.role_id AS "roleId"
        FROM users
        WHERE users.id = :contextUserId
      `,
      {
        replacements: {
          contextUserId: dto.contextUserId,
        },
        plain: true,
        type: QueryTypes.SELECT,
      },
    )) as Record<'roleId', roleTypes>;

    let whereSql = '';

    /** Мастеру выводим только его заказы */
    if (userRole === 'master') {
      whereSql = 'WHERE orders.master_id = :contextUserId';
      /** Клиенту выводим только его заказы */
    } else if (userRole === 'client') {
      whereSql = 'WHERE orders.client_id = :contextUserId';
    }

    const data = (await this.sequelize.query(
      `
          SELECT
              orders.id,
              orders.execution_date AS "executionDate",
              orders.service_id AS "serviceId",
              services.name AS "serviceName",
              orders.client_id AS "clientId",
              CONCAT(cu.name,
                     CASE WHEN cu.last_name IS NOT NULL AND cu.last_name != '' THEN ' ' || cu.last_name ELSE '' END
              ) AS "clientName",
              orders.master_id AS "masterId",
              CONCAT(mu.name,
                     CASE WHEN mu.last_name IS NOT NULL AND mu.last_name != '' THEN ' ' || mu.last_name ELSE '' END
              ) AS "masterName",
              orders.description,
              orders.status_id AS "status"
          FROM orders
          LEFT JOIN services ON services.id = orders.service_id
          LEFT JOIN users cu ON cu.id = orders.client_id
          LEFT JOIN users mu ON mu.id = orders.master_id
          ${whereSql}
          LIMIT :limit
          OFFSET :offset
      `,
      {
        replacements: {
          contextUserId: dto.contextUserId,
          limit: dto.limit || 100,
          offset: dto.offset || 0,
        },
        type: QueryTypes.SELECT,
      },
    )) as OrdersGetListResponseRepositoryDto['data'];

    const { count } = (await this.sequelize.query(
      `
    SELECT COUNT(*) AS count FROM orders
    ${whereSql}
    `,
      {
        replacements: {
          contextUserId: dto.contextUserId,
        },
        plain: true,
        type: QueryTypes.SELECT,
      },
    )) as Record<'count', string>;

    return {
      data,
      count,
    };
  }

  /** Получение списка доступных мастеров */
  async getMastersList(
    dto: OrdersGetMastersListRepositoryDto,
  ): Promise<OrdersGetMastersListResponseRepositoryDto[]> {
    const data = (await this.sequelize.query(
      `
        SELECT
          id,
          CONCAT(users.name,
                 CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END
          ) AS "name"
        FROM users
        WHERE users.role_id = 'master'
          AND NOT EXISTS(
          SELECT * FROM employee_absence ea
          WHERE ea.employee_id = users.id AND :executionDate BETWEEN ea.date_from AND ea.date_to
        )
          AND EXISTS(
          SELECT * FROM employee_service es
          WHERE es.master_id = users.id AND es.service_id = :serviceId
        )
    `,
      {
        replacements: {
          serviceId: dto.serviceId,
          executionDate: dto.executionDate,
        },
        type: QueryTypes.SELECT,
      },
    )) as OrdersGetMastersListResponseRepositoryDto[];

    return data;
  }
}
