import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { OrdersModel } from './orders.model';
import { StorageModel } from './storage.model';

interface IOrderMaterials {
  id: string;
  material_id: string;
  order_id: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'order_materials', paranoid: false, comment: 'Материалы для заказа' })
export class OrderMaterialsModel extends Model<IOrderMaterials> implements IOrderMaterials {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => StorageModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Название материала',
  })
  material_id: string;

  @ForeignKey(() => OrdersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Кол-во единиц материала',
  })
  order_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Кол-во зарезервированного материала',
  })
  amount: number;

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
