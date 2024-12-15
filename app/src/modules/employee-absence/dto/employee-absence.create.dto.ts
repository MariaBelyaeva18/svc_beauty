import { IsNotEmpty } from 'class-validator';

export class EmployeeAbsenceCreateDto {
  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;

  @IsNotEmpty()
  reason: string;
}
