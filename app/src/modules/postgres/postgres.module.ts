import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const postgresProvider = {
  provide: 'PG_CONNECTION',
  useValue: new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: String(process.env.POSTGRES_PASSWORD),
    port: Number(process.env.POSTGRES_PORT),
  }),
};

@Module({
  providers: [postgresProvider],
  exports: [postgresProvider],
})
export class PostgresModule {}
