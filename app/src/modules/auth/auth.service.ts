import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { JwtTokenService } from '../../common/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async logout() {
    return {
      message: 'Успешный выход из системы',
    };
  }

  async checkUser(param: { username: string; password: string }) {
    const data = await this.sequelize.query(
      `
      SELECT 
        id,
        name,
        middle_name,
        last_name,
        login,
        phone_number,
        role_id
      FROM users
      WHERE users.login = :login AND users.password = :password 
    `,
      {
        replacements: {
          login: param.username,
          password: param.password,
        },
        /** Чтобы не надо было доставать 1 элемент из массива */
        plain: true,
        type: QueryTypes.SELECT,
      },
    );

    if (!data) {
      throw new BadRequestException('Неправильный логин или пароль');
    }

    const token = this.jwtTokenService.sign({
      sub: (data as any).id,
      login: (data as any).login,
      roleId: (data as any).role_id,
    });

    return {
      data,
      token,
      message: 'Успешный вход в систему',
    };
  }

  async registerUser(dto) {
    if (!dto.password || dto.password !== dto.repeatPassword) {
      throw new BadRequestException('Пароли не совпадают');
    }

    await this.sequelize.models.UsersModel.create({
      name: dto.name,
      middle_name: dto.middle_name,
      last_name: dto.last_name,
      login: dto.username,
      password: dto.password,
      role_id: dto.role,
      phone_number: dto.phone,
    });

    return {
      message: 'Пользователь успешно создан',
    };
  }
}
