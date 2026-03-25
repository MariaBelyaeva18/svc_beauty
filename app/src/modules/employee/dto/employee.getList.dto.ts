import { IsNotEmpty, IsNumberString } from 'class-validator';

export class EmployeeGetListDto {
  @IsNotEmpty()
  @IsNumberString()
  limit: string;

  @IsNotEmpty()
  @IsNumberString()
  offset: string;
}
