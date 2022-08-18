import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const appDirectory = fs.realpathSync(process.cwd());
const resolveFile = path.resolve(appDirectory, '.env');

const dotenvFiles = [`${resolveFile}.local`, resolveFile];

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});
const configService = new ConfigService();

export default new DataSource({
  type: configService.get<'postgres'>('DB_SOURCE'),
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: false,
  entities: [path.join(__dirname, '../entities/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '../migrations/*.entity.{js,ts}')],
  logging: true,
});
