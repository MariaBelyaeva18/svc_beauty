import { IsNotEmpty } from 'class-validator';

export class EmployeeAbsenceGetListDto {
  @IsNotEmpty()
  month: string;

  @IsNotEmpty()
  year: string;
}
