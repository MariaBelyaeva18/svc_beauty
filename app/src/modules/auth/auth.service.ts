import { HttpException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('PG_CONNECTION') private postgres: any) {}

  async checkUser(param: { username: string; password: string }) {
    try {
      const { rows } = await this.postgres.query(
        `
        SELECT password FROM users
        WHERE login = $1;
      `,
        [param.username],
      );

      if (!rows.length || rows[0].password !== param.password) {
        throw new Error();
      }
      return {
        message: 'Успешный вход в систему',
      };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        {
          message: 'Неправильный логин или пароль',
        },
        400,
      );
    }
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
