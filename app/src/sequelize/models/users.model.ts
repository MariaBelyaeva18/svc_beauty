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
import { RolesModel } from './roles.model';

interface IUser {
  id: string;
  name: string;
  middle_name: string | null;
  last_name: string | null;
  login: string;
  password: string;
  role_id: 'client' | 'master' | 'admin';
  phone_number: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type roleTypes = 'client' | 'master' | 'admin';

@Table({ tableName: 'users', paranoid: false })
export class UsersModel extends Model<IUser> implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  last_name: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  middle_name: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  login: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  password: string;

  @ForeignKey(() => RolesModel)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    defaultValue: 'client',
  })
  role_id: roleTypes;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  phone_number: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  avatar_path: string | null;

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
