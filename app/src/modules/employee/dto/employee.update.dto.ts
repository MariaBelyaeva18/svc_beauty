import { IsNotEmpty } from 'class-validator';
import { roleTypes } from '../../../sequelize/models/users.model';

export class EmployeeUpdateDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  phone?: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roleId: roleTypes;

  @IsNotEmpty()
  masterServiceIds: string[];
}
