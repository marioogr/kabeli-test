/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly DB_HOST: string;
    readonly DB_SOURCE: string;
    readonly DB_PORT: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
  }
}
