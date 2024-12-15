export class EmployeeAbsenceGetListResponseDto {
  id: string;

  dateFrom: string;

  dateTo: string;

  reason: string;

  employee: {
    id: string;

    name: string;
  };
}
