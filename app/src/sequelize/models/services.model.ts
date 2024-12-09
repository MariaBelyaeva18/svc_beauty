import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

interface IService {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'services', paranoid: false, comment: 'Услуги' })
export class ServicesModel extends Model<IService> implements IService {
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
    comment: 'Название услуги',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Описание услуги',
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(9, 2),
    allowNull: false,
    comment: 'Стоимость услуги',
  })
  cost: number;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    comment: 'Длительность услуги',
  })
  duration: string;

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
