import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async getList() {
    const data = await this.sequelize.query(
      `
      SELECT 
        id,
        role,
        description
      FROM roles
      WHERE "deletedAt" IS NULL
    `,
      {
        type: QueryTypes.SELECT,
      },
    );

    return {
      data,
      message: 'Роли успешно получены',
    };
  }
}
