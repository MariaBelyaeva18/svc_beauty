export class EmployeeAbsenceGetListResponseDto {
  id: string;

  dateFrom: Date;

  dateTo: Date;

  reason: string;

  employee: {
    id: string;

    name: string;
  };
}
