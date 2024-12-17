import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { OrdersGetListRepositoryDto } from './dto/repository/orders.getList.repository.dto';
import { OrdersGetMastersListRepositoryDto } from './dto/repository/orders.getMastersList.repository.dto';
import { OrdersGetMastersListResponseRepositoryDto } from './dto/repository/responses/orders.getMastersList.response.repository.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка мастеров */
  async getList(dto: OrdersGetListRepositoryDto): Promise<any[]> {
    const data = (await this.sequelize.query(
      `
        SELECT
          ea.id,
          ea.date_from AS "dateFrom",
          ea.date_to AS "dateTo",
          ea.reason,
          users.id AS "employeeId",
          CONCAT(users.name,
                 CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END
          ) AS "employeeName"
        FROM employee_absence ea
               LEFT JOIN users ON users.id = ea.employee_id
        WHERE EXTRACT(MONTH FROM ea.date_from) = :month
          AND EXTRACT(YEAR FROM ea.date_from) = :year;
      `,
      {
        replacements: {},
        type: QueryTypes.SELECT,
      },
    )) as any[];

    return data;
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
          WHERE ea.employee_id = users.id AND :executionDate NOT BETWEEN ea.date_from AND ea.date_to
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
