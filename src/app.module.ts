import {
  Module,
  CacheModule,
  ValidationPipe,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@common/logger/logger.module';
import { CoopeuchModule } from '@coopuech/coopeuch.module';
import { RepositoryModule } from '@repository/repository.module';
import { GlobalExceptionsFilter } from '@filters';
import { LoggerInterceptor } from '@common/interceptor';
import { LoggerMiddleware } from '@common/middleware';
import { JwtModule } from '@nestjs/jwt';
import { IndexModule } from './index/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync<ClientOpts>({
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        ttl: 780,
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) =>
        ({
          type: configService.get<'postgres'>('DB_SOURCE'),
          host: configService.get('DB_HOST_WRITE'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          keepConnectionAlive: true,
          synchronize: process.env.NODE_ENV === 'development',
          entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
          logging: process.env.NODE_ENV === 'development',
          migrations: [path.join(__dirname, '**', '*.migration.{ts,js}')],
          replication: {
            master: {
              host: configService.get('DB_HOST_WRITE'),
              port: +configService.get('DB_PORT'),
              username: configService.get('DB_USER'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABASE'),
            },
            slaves: [
              {
                host: configService.get('DB_HOST_READ'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
              },
            ],
          },
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get('JWT_PRIVATE_KEY'),
        publicKey: configService.get('JWT_PUBLIC_KEY'),
        signOptions: {
          // algorithm: configService.get('JWT_ALGORITHM'),
          expiresIn: configService.get('JWT_EXPIRES_IN'),
          // header: {
          //   kid: 'Coopeuch Chile',
          //   alg: configService.get('JWT_ALGORITHM'),
          // },
        },
      }),
    }),
    LoggerModule,
    CoopeuchModule,
    RepositoryModule,
    IndexModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
