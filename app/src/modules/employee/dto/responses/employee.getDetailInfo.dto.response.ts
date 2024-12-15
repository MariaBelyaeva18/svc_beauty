import { roleTypes } from '../../../../sequelize/models/users.model';

export class EmployeeGetDetailInfoDtoResponse {
  id: string;

  fio: string;

  name: string;

  middleName: string | null;

  lastName: string | null;

  phone: string | null;

  roleId: roleTypes;

  roleName: string;

  login: string;

  password: string;

  avatarPath: string | null;

  masterServices: string[];
}
