import { IsNotEmpty, IsNumberString } from 'class-validator';

export class EmployeeAbsenceGetListDto {
  @IsNotEmpty()
  @IsNumberString()
  month: string;

  @IsNotEmpty()
  @IsNumberString()
  year: string;
}
