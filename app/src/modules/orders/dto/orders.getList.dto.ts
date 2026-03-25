import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class OrdersGetListDto {
  @IsNotEmpty()
  @IsString()
  contextUserId: string;

  @IsNotEmpty()
  @IsNumberString()
  limit: string;

  @IsNotEmpty()
  @IsNumberString()
  offset: string;
}
