import { ApiProperty } from '@nestjs/swagger';

export default class UserInfoDto {
  @ApiProperty({
    example: '17bb086f-1bd6-451a-a7c2-c95001855ed0',
  })
  userId: string;
}
