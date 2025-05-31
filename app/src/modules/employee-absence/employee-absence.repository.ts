import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { EmployeeAbsenceGetListRepositoryDto } from './dto/repository/employee-absence.getList.repository.dto';
import { EmployeeAbsenceGetListRepositoryResponseDto } from './dto/repository/responses/employee-absence.getList.repository.response.dto';

@Injectable()
export class EmployeeAbsenceRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка мастеров */
  async getList(
    dto: EmployeeAbsenceGetListRepositoryDto,
  ): Promise<EmployeeAbsenceGetListRepositoryResponseDto[]> {
    const data = (await this.sequelize.query(
      `
        SELECT
          ea.id,
          ea.date_from AS "dateFrom",
          ea.date_to AS "dateTo",
          ea.reason,
          users.id AS "employeeId",
          ea."deletedAt",
          CONCAT(users.name,
                 CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END
          ) AS "employeeName"
        FROM employee_absence ea
               LEFT JOIN users ON users.id = ea.employee_id
        WHERE ea."deletedAt" IS NULL AND :month BETWEEN EXTRACT(MONTH FROM ea.date_from) AND EXTRACT(MONTH FROM ea.date_to)
          AND :year BETWEEN EXTRACT(YEAR FROM ea.date_from) AND EXTRACT(YEAR FROM ea.date_to)
        ORDER BY "employeeName" ASC;
      `,
      {
        replacements: {
          month: dto.month,
          year: dto.year,
        },
        type: QueryTypes.SELECT,
      },
    )) as EmployeeAbsenceGetListRepositoryResponseDto[];

    return data;
  }
}
