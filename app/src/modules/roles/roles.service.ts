import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@Inject('PG_CONNECTION') private postgres: any) {}

  async getList() {
    const { rows } = await this.postgres.query(
      `
      SELECT * FROM roles WHERE "deletedAt" IS NULL ;
    `,
    );
    return {
      data: rows,
      message: 'Роли получены',
    };
  }

  // async createRole(dto) {
  //   await this.postgres.query(
  //     `
  //     INSERT INTO users (id, name, middle_name, last_name, login, password, phone_number, role_id, "createdAt", "updatedAt")
  //     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, now(), now());
  //   `,
  //     [dto.name, dto.middleName, dto.lastName, dto.login, dto.password, dto.phone, dto.role],
  //   );
  // }
}
