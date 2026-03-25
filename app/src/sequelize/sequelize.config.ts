import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as process from 'node:process';
import { EmployeeAbsenceModel } from './models/employeAbsense.model';
import { EmployeeServiceModel } from './models/employeeService.model';
import { OrderMaterialsModel } from './models/orderMaterials.model';
import { OrdersModel } from './models/orders.model';
import { RolesModel } from './models/roles.model';
import { ServicesModel } from './models/services.model';
import { StatusesModel } from './models/statuses.model';
import { StorageModel } from './models/storage.model';
import { UsersModel } from './models/users.model';

export const sequelizeConfig = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'developer',
  password: process.env.POSTGRES_PASSWORD ?? '123',
  database: process.env.POSTGRES_DB ?? 'beauty_shop',
  autoLoadModels: false,
  synchronize: false,
  logging: false,
  dialectOptions: {
    statement_timeout: Number(process.env.POSTGRES_STATEMENT_TIMEOUT ?? 30000),
  },
  pool: {
    max: Number(process.env.POSTGRES_POOL_MAX ?? 10),
    min: Number(process.env.POSTGRES_POOL_MIN ?? 0),
    acquire: 30000,
    idle: 10000,
  },
  models: [
    RolesModel,
    UsersModel,
    OrdersModel,
    StorageModel,
    StatusesModel,
    ServicesModel,
    OrderMaterialsModel,
    EmployeeServiceModel,
    EmployeeAbsenceModel,
  ],
} as SequelizeModuleOptions;
