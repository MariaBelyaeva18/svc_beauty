import { IsNotEmpty } from 'class-validator';

export class ServicesCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  cost: string;

  @IsNotEmpty()
  duration: number;
}
