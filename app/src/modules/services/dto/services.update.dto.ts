import { IsNotEmpty } from 'class-validator';

export class ServicesUpdateDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  cost: string;

  @IsNotEmpty()
  duration: number;
}
