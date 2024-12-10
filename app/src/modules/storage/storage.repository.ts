import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { StorageGetListRepositoryDtoResponse } from './dto/repository/responses/storage.getListRepository.dto.response';
import { StorageGetListDto } from './dto/storage.getList.dto';

@Injectable()
export class StorageRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /** Получение списка материалов со склада */
  async getList(dto: StorageGetListDto): Promise<StorageGetListRepositoryDtoResponse> {
    const materials = (await this.sequelize.query(
      `
        SELECT 
            id,
            material_name AS name,
            amount
        FROM storage
        ORDER BY material_name ASC
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
    )) as StorageGetListRepositoryDtoResponse['materials'];

    const { totalCount } = (await this.sequelize.query(
      `
      SELECT COUNT(id) as "totalCount" FROM storage
      `,
      {
        plain: true,
      },
    )) as Record<'totalCount', string>;

    return {
      materials,
      totalCount: +totalCount,
    };
  }
}
