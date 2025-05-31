import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { OrdersGetListRepositoryDto } from './dto/repository/orders.getList.repository.dto';
import { OrdersGetMastersListRepositoryDto } from './dto/repository/orders.getMastersList.repository.dto';
import { OrdersGetListResponseRepositoryDto } from './dto/repository/responses/orders.getList.response.repository.dto';
import { OrdersGetMastersListResponseRepositoryDto } from './dto/repository/responses/orders.getMastersList.response.repository.dto';
import { OrdersGetStatusesForCurrentMonthResponseRepositoryDto } from './dto/repository/responses/orders.getStatusesForCurrentMonth.response.repository.dto';
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
              orders.execution_date + INTERVAL '3 hours' AS "executionDate",
              orders.service_id AS "serviceId",
              orders.time,
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
              get_order_status(orders.status_id, orders.execution_date + INTERVAL '3 hours') AS "status"
          FROM orders
          LEFT JOIN services ON services.id = orders.service_id
          LEFT JOIN users cu ON cu.id = orders.client_id
          LEFT JOIN users mu ON mu.id = orders.master_id
          ${whereSql}
          ORDER BY orders."execution_date" ASC
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
    return (await this.sequelize.query(
      `
          SELECT
            id,
            CONCAT(users.name,
                   CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END
            ) AS "name"
          FROM users
          WHERE users.role_id = 'master'
            AND EXISTS(
            SELECT * FROM employee_service es
            WHERE es.master_id = users.id AND es.service_id = :serviceId
          )
        `,
      {
        replacements: {
          serviceId: dto.serviceId,
        },
        type: QueryTypes.SELECT,
      },
    )) as OrdersGetMastersListResponseRepositoryDto[];
  }

  /** Получение кол-во статусов */
  async getStatusesForCurrentMonth(): Promise<
    OrdersGetStatusesForCurrentMonthResponseRepositoryDto[]
  > {
    return (await this.sequelize.query(
      `
      SELECT
        status_id AS status,
        COUNT(*) AS count
      FROM orders
      WHERE DATE_TRUNC('month', "createdAt") = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY status_id
    `,
      {
        type: QueryTypes.SELECT,
      },
    )) as OrdersGetStatusesForCurrentMonthResponseRepositoryDto[];
  }
}
