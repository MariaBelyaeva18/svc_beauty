import { IsNotEmpty } from 'class-validator';
import { roleTypes } from '../../../sequelize/models/users.model';

export class EmployeeCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  phone?: string;

  @IsNotEmpty()
  roleId: roleTypes;

  @IsNotEmpty()
  masterServiceIds: string[];
}
