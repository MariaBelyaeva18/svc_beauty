import { roleTypes } from '../../../sequelize/models/users.model';

export class EmployeeUpdateDto {
  id: string;

  name: string;

  middleName: string;

  lastName: string;

  phone?: string;

  username: string;

  password: string;

  roleId: roleTypes;

  masterServiceIds: string[];
}
