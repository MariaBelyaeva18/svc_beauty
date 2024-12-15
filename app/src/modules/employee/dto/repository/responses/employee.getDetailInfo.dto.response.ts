import { roleTypes } from '../../../../../sequelize/models/users.model';

export class EmployeeGetListRepositoryDtoResponse {
  id: string;

  fio: string;

  name: string;

  middleName: string | null;

  lastName: string | null;

  phone: string | null;

  roleId: roleTypes;

  roleName: string;
}
