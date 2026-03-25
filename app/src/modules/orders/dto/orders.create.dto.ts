import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrdersCreateDto {
  @IsOptional()
  @IsString()
  execution_date?: string;

  @IsNotEmpty()
  @IsString()
  executionDate: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  service_id?: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  client_id?: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  master_id?: string;

  @IsNotEmpty()
  @IsString()
  masterId: string;

  @IsOptional()
  @IsString()
  description: string;
}
