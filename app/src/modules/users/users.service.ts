import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import * as fs from 'node:fs';
import { extname } from 'path';

@Injectable()
export class UsersService {
  private uploadDir = './uploads';

  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {
    // Проверяем и создаем директорию (если её нет)
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdir(this.uploadDir, (error) => {
        console.error('Failed to create directory:', error);
      });
    }
  }

  async getUserInfo(userId: string) {
    return this.sequelize.query(
      `
      SELECT 
          users.*,
          roles.role AS role_name
      FROM users
      LEFT JOIN roles ON roles.id = users.role_id
      WHERE users.id = :userId
    `,
      {
        replacements: {
          userId,
        },
        plain: true,
        type: QueryTypes.SELECT,
      },
    );
  }

  async updateUserInfo(userId: string, dto: any) {
    return this.sequelize.models.UsersModel.update(dto, {
      where: {
        id: userId,
      },
    });
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExt}`;

    const filePath = `${this.uploadDir}/${fileName}`;

    // Сохраняем файл
    fs.writeFile(filePath, file.buffer, (error) => {
      console.error(error);
    });

    await this.sequelize.models.UsersModel.update(
      {
        avatar_path: filePath,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    return `/uploads/${fileName}`;
  }
}
