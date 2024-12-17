import { IsNotEmpty } from 'class-validator';

export class OrdersCreateDto {
  @IsNotEmpty()
  executionDate: string;

  @IsNotEmpty()
  serviceId: string;

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  masterId: string;

  @IsNotEmpty()
  description: string;
}
