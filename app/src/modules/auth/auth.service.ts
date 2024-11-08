import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('PG_CONNECTION') private postgres: any) {}

  async checkUser(param: { username: string; password: string }) {
    const { rows } = await this.postgres.query(
      `
      SELECT password FROM users
      WHERE login = $1;
    `,
      [param.username],
    );
    return rows.length ? rows[0].password === param.password : null;
  }

  async registerUser(dto) {
    await this.postgres.query(
      `
      INSERT INTO users (id, name, middle_name, last_name, login, password, phone_number, role_id, "createdAt", "updatedAt") 
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, now(), now());
    `,
      [dto.name, dto.middleName, dto.lastName, dto.login, dto.password, dto.phone, dto.role],
    );
  }
}
