import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { UsersModel } from './users.model';

interface IEmployeeAbsence {
  id: string;
  employee_id: string;
  date_from: Date;
  date_to: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Table({ tableName: 'employee_absence', paranoid: true, comment: 'Отсутствия сотрудников' })
export class EmployeeAbsenceModel extends Model<IEmployeeAbsence> implements IEmployeeAbsence {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'id сотрудника',
  })
  employee_id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Дата от',
  })
  date_from: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Дата до',
  })
  date_to: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Причина',
  })
  reason: string;

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

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date | null;
}
