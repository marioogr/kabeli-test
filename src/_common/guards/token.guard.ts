import {
  CACHE_MANAGER,
  CacheStore,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AccessToken } from '@interfaces';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authorization = req.header('authorization');

    if (authorization) {
      const token = authorization.split(' ')[1];

      let decodedToken: AccessToken;

      try {
        // Hacer lógica personalizada con el token del usuario segun sea necesario
        decodedToken = this.jwtService.verify(token, {
          publicKey: this.configService.get('JWT_PUBLIC_KEY'),
          secret: this.configService.get('JWT_PRIVATE_KEY'),
        }) as AccessToken;

        req.token = decodedToken;

        return true;
      } catch (error) {}

      throw new ForbiddenException({
        message: 'token-expire',
      });
    }

    return false;
  }
}
