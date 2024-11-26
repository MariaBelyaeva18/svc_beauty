import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

interface IRole {
  id: 'client' | 'master' | 'admin';
  role: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

@Table({ tableName: 'roles', paranoid: false })
export class RolesModel extends Model<IRole> implements IRole {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: 'client' | 'master' | 'admin';

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  description: string | null;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: true,
  })
  deletedAt: Date;
}
