import { roleTypes } from '../../../../sequelize/models/users.model';

export class EmployeeGetListDtoResponse {
  data: {
    id: string;

    fio: string;

    name: string;

    middleName: string | null;

    lastName: string | null;

    phone: string | null;

    roleId: roleTypes;

    roleName: string;

    masterServices: {
      id: string;
      name: string;
    }[];
  }[];

  totalCount: number;
}
