import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) {}

  @Get('health')
  health(): string {
    return 'OK!!';
  }

  // TODO: Remover esto al iniciar un projecto nuevo, ya que es un ejemplo de como usar redis en un controller
  @Get('cache-redis')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('cacheRedis')
  @CacheTTL(20)
  cacheRedis(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('onCache');
      }, 3000);
    });
  }

  @Get('remove-cache')
  removeCache() {
    return this.cacheManager.del('cacheRedis');
  }
}
