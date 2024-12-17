import { IsNotEmpty } from 'class-validator';

export class OrdersGetMastersListDto {
  @IsNotEmpty()
  serviceId: string;

  @IsNotEmpty()
  executionDate: string;
}
