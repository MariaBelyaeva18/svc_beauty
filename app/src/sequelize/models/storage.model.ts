import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

interface IStorage {
  id: string;
  material_name: string;
  amount: number;
  expiration_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'storage', paranoid: false, comment: 'Склад' })
export class StorageModel extends Model<IStorage> implements IStorage {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Название материала',
  })
  material_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Кол-во единиц материала',
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Срок годности',
  })
  expiration_date: Date;

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
