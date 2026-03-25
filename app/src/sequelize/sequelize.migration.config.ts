import { Dialect } from 'sequelize';
import * as process from 'node:process';

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
  };
}

const username = process.env.POSTGRES_USER ?? 'developer';
const password = process.env.POSTGRES_PASSWORD ?? '123';
const database = process.env.POSTGRES_DB ?? 'beauty_shop';
const host = process.env.POSTGRES_HOST ?? 'localhost';
const port = process.env.POSTGRES_PORT ?? '5432';

const sequelizeMigrationConfig: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    host,
    port,
    database,
    username,
    password,
  },
  test: {
    dialect: 'postgres',
    host,
    port,
    database,
    username,
    password,
  },
  production: {
    dialect: 'postgres',
    host,
    port,
    database,
    username,
    password,
  },
};

export = sequelizeMigrationConfig;
