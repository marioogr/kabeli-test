import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync<ClientOpts>({
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password:
          process.env.NODE_ENV === 'development'
            ? configService.get('REDIS_PASSWORD')
            : undefined,
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const typeOrmConfig = {
          type: configService.get<'postgres'>('DB_SOURCE'),
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          keepConnectionAlive: true,
          // TODO: dejarlo en false y generar una migracion inicial | conversar si se deja en sincronizacion
          synchronize: true,
          entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
          logging: process.env.NODE_ENV === 'development',
        };

        return typeOrmConfig;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
