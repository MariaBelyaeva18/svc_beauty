import { IsNotEmpty, IsString } from 'class-validator';

export class OrdersGetMastersListDto {
  @IsNotEmpty()
  @IsString()
  serviceId: string;
}
