import { IsNotEmpty } from 'class-validator';

export class OrdersGetListDto {
  @IsNotEmpty()
  contextUserId: string;

  limit: string;

  offset: string;
}
