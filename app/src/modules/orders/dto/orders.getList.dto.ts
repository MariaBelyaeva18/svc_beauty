import { IsNotEmpty } from 'class-validator';

export class OrdersGetListDto {
  @IsNotEmpty()
  contextUserId: string;
}
