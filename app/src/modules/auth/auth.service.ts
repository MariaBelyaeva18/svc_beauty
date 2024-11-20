import { HttpException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('PG_CONNECTION') private postgres: any) {}

  async checkUser(param: { username: string; password: string }) {
    try {
      const { rows } = await this.postgres.query(
        `
        SELECT id, name, middle_name, last_name, login, password, phone_number, role_id FROM users
        WHERE login = $1;
      `,
        [param.username],
      );
      if (!rows.length || rows[0].password !== param.password) {
        throw new Error();
      }
      delete rows[0].password;
      return {
        data: rows[0],
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
    try {
      const { rows } = await this.postgres.query(
        `
            SELECT password
            FROM users
            WHERE login = $1;
        `,
        [dto.username],
      );
      if (rows.length) {
        throw new Error();
      }
      if (!dto.password || dto.password !== dto.repeatPassword) {
        throw new Error();
      }
      await this.postgres.query(
        `
          INSERT INTO users (id, name, middle_name, last_name, login, password, phone_number, role_id, "createdAt",
                             "updatedAt")
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, now(), now());
      `,
        [dto.name, dto.middle_name, dto.last_name, dto.username, dto.password, dto.phone, dto.role],
      );
    } catch (e) {
      console.error(e);
      throw new HttpException(
        {
          message: 'ERROR',
        },
        400,
      );
    }
  }
}
