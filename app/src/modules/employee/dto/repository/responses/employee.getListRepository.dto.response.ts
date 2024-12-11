import { roleTypes } from '../../../../../sequelize/models/users.model';

export class EmployeeGetListRepositoryDtoResponse {
  data: {
    id: string;

    fio: string;

    name: string;

    middleName: string | null;

    lastName: string | null;

    phone: string | null;

    roleId: roleTypes;

    roleName: string;
  }[];

  totalCount: number;
}
