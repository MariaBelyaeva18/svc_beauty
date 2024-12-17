import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export type orderStatuses = 'done' | 'accepted' | 'canceled' | 'created';

interface IStatus {
  id: orderStatuses;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'statuses', paranoid: false, comment: 'Статусы' })
export class StatusesModel extends Model<IStatus> implements IStatus {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: orderStatuses;

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
