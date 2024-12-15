import { IsNotEmpty } from 'class-validator';

export class EmployeeAbsenceUpdateDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;

  @IsNotEmpty()
  reason: string;
}
