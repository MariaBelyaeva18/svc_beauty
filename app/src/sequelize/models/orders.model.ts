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
import { StatusesModel } from './statuses.model';
import { UsersModel } from './users.model';

interface IOrder {
  id: string;
  execution_date: Date;
  service_id: string;
  client_id: string;
  master_id: string;
  description: string;
  status_id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'orders', paranoid: false, comment: 'Заказы' })
export class OrdersModel extends Model<IOrder> implements IOrder {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Дата исполнения заказа',
  })
  execution_date: Date;

  @ForeignKey(() => ServicesModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'id услуги',
  })
  service_id: string;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'id клиента (заказчика)',
  })
  client_id: string;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'id мастера',
  })
  master_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Комментарий к заказу',
  })
  description: string;

  @ForeignKey(() => StatusesModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'id статуса',
  })
  status_id: string;

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
