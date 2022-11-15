import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
}

export default new DataSource({
  type: process.env.DB_SOURCE as 'postgres',
  host: process.env.DB_HOST_WRITE,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: ['./src/**/*.entity.{ts,js}'],
  migrations: ['./src/**/*.migration.{ts,js}'],
});
