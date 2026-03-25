import { IsNotEmpty, IsString } from 'class-validator';

export class OrdersGetAvailableSlotsDto {
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  @IsString()
  masterId: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}
