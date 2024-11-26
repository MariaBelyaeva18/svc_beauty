import { Dialect } from 'sequelize';

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

const username = 'developer';
const password = '123';
const database = 'beauty_shop';
const host = 'localhost';
const port = '5432';

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
