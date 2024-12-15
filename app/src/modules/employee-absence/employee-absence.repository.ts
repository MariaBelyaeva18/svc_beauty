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
          CONCAT(users.name,
                 CASE WHEN users.middle_name IS NOT NULL AND users.middle_name != '' THEN ' ' || users.middle_name ELSE '' END,
                 CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END
          ) AS "employeeName"
        FROM employee_absence ea
               LEFT JOIN users ON users.id = ea.employee_id
        WHERE EXTRACT(MONTH FROM ea.date_from) = :month
          AND EXTRACT(YEAR FROM ea.date_from) = :year;
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
