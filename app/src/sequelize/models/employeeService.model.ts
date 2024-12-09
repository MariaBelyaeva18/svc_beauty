import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ServicesModel } from './services.model';
import { UsersModel } from './users.model';

interface IEmployeeService {
  id: string;
  master_id: string;
  service_id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'employee_service', paranoid: false, comment: 'Услуги мастеров' })
export class EmployeeServiceModel extends Model<IEmployeeService> implements IEmployeeService {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'id мастера',
  })
  master_id: string;

  @ForeignKey(() => ServicesModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'id услуги',
  })
  service_id: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
