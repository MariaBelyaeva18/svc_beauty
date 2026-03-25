import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth/public.decorator';
import { JwtTokenService } from '../jwt/jwt.service';
import { JWT_ERROR_EXPIRED, JWT_ERROR_INVALID } from '../jwt/jwt.utils';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    if (request.method === 'OPTIONS') return true;
    const headerValue = request.headers.authorization;
    if (!headerValue) throw new UnauthorizedException('Missing Authorization header');

    const [scheme, token] = headerValue.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    try {
      const payload = this.jwtTokenService.verify(token);
      (request as any).user = payload;
      return true;
    } catch (err) {
      if (err instanceof Error && err.name === JWT_ERROR_EXPIRED) {
        throw new UnauthorizedException('Token expired');
      }
      if (err instanceof Error && err.name === JWT_ERROR_INVALID) {
        throw new UnauthorizedException('Invalid token');
      }
      if (err instanceof InternalServerErrorException) throw err;
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
