import { ApiProperty } from '@nestjs/swagger';

export default class UsersImportDto {
  @ApiProperty({
    type: String,
    example: 'aac3eb97-f26f-41c1-b9f8-3529572d7e66',
    description: 'id пользователя',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Иван',
    description: 'Имя пользователя',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'Иванович',
    description: 'Отчество пользователя',
  })
  middleName: string;

  @ApiProperty({
    type: String,
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  fio: string;

  @ApiProperty({
    type: String,
    example: 'ivan.ivanov',
    description: 'Логин пользователя',
  })
  login: string;

  @ApiProperty({
    type: String,
    example: 'test@areal.test',
    description: 'Эл. почта пользователя',
  })
  email: string;
}
