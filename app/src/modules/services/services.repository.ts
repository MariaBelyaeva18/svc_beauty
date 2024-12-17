import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { ServicesGetListRepositoryDtoResponse } from './dto/repository/responses/services.getListRepository.dto.response';
import { ServicesGetListDto } from './dto/services.getList.dto';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка материалов со склада */
  async getList(dto: ServicesGetListDto): Promise<ServicesGetListRepositoryDtoResponse> {
    const data = (await this.sequelize.query(
      `
        SELECT 
            id,
            name,
            description,
            cost,
            duration
        FROM services
        ORDER BY name ASC
        LIMIT :limit
        OFFSET :offset
      `,
      {
        replacements: {
          limit: dto.limit || 100,
          offset: dto.offset || 0,
        },
        type: QueryTypes.SELECT,
      },
    )) as ServicesGetListRepositoryDtoResponse['data'];

    const { totalCount } = (await this.sequelize.query(
      `
      SELECT COUNT(id) as "totalCount" FROM services
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
}
