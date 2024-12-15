import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { EmployeeGetListDto } from './dto/employee.getList.dto';
import { EmployeeGetListRepositoryDtoResponse } from './dto/repository/responses/employee.getListRepository.dto.response';
import { EmployeeGetMasterServicesDto } from './dto/repository/responses/employee.getMasterServices.dto';
import { EmployeeGetDetailInfoDtoResponse } from './dto/responses/employee.getDetailInfo.dto.response';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка мастеров */
  async getList(dto: EmployeeGetListDto): Promise<EmployeeGetListRepositoryDtoResponse> {
    const data = (await this.sequelize.query(
      `
        SELECT 
            users.id,
            users.name,
            users.phone_number AS phone,
            users.role_id as "roleId",
            users.name,
            users.middle_name AS "middleName",
            users.last_name AS "lastName",
            CONCAT(users.name,
                   CASE WHEN users.middle_name IS NOT NULL AND users.middle_name != '' THEN ' ' || users.middle_name ELSE '' END,
                   CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END) AS fio,
            roles.role AS "roleName"
        FROM users
        LEFT JOIN roles ON roles.id = users.role_id
        WHERE users.role_id != 'client'
        ORDER BY users.name ASC
        LIMIT :limit
        OFFSET :offset
      `,
      {
        replacements: {
          limit: dto.limit,
          offset: dto.offset,
        },
        type: QueryTypes.SELECT,
      },
    )) as EmployeeGetListRepositoryDtoResponse['data'];

    const { totalCount } = (await this.sequelize.query(
      `
      SELECT COUNT(id) as "totalCount" FROM users
      WHERE users.role_id != 'client' 
      `,
      {
        plain: true,
      },
    )) as Record<'totalCount', string>;

    return {
      data,
      totalCount: +totalCount,
    };
  }

  /** Получение детальной информации о мастере */
  async getDetailInfo(masterId: string): Promise<EmployeeGetDetailInfoDtoResponse> {
    const data = (await this.sequelize.query(
      `
              SELECT
                  users.id,
                  users.name,
                  users.phone_number AS phone,
                  users.role_id as "roleId",
                  users.name,
                  users.middle_name AS "middleName",
                  users.last_name AS "lastName",
                  users.avatar_path AS "avatarPath",
                  users.login AS "username",
                  users.password,
                  users.avatar_path AS "avatarPath",
                  CONCAT(users.name,
                         CASE WHEN users.middle_name IS NOT NULL AND users.middle_name != '' THEN ' ' || users.middle_name ELSE '' END,
                         CASE WHEN users.last_name IS NOT NULL AND users.last_name != '' THEN ' ' || users.last_name ELSE '' END) AS fio,
                  roles.role AS "roleName"
              FROM users
              LEFT JOIN roles ON roles.id = users.role_id
              WHERE users.id = :masterId
          `,
      {
        replacements: {
          masterId,
        },
        plain: true,
        type: QueryTypes.SELECT,
      },
    )) as EmployeeGetDetailInfoDtoResponse;

    return data;
  }

  /** Получение услуг мастеров */
  async getMasterServices(masterIds: string[]): Promise<EmployeeGetMasterServicesDto[]> {
    return this.sequelize.query(
      `
        SELECT
            services.id,
            es.master_id AS "masterId",
            services.name
        FROM employee_service es
        LEFT JOIN services ON services.id = es.service_id
        WHERE es.master_id IN (:masterIds)
      `,
      {
        replacements: {
          masterIds,
        },
        type: QueryTypes.SELECT,
      },
    );
  }
}
