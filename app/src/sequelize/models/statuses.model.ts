import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

interface IStatus {
  id: string;
  status: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'statuses', paranoid: false, comment: 'Статусы' })
export class StatusesModel extends Model<IStatus> implements IStatus {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    comment: 'Название статуса',
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Описание статуса',
  })
  description: string | null;

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
