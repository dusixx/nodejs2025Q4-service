import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { envVar } from '../config/env';
import { IS_PUBLIC_KEY } from './auth.decorators';
import { getBearerToken } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = getBearerToken(request);
    try {
      const secret = envVar.JWT_SECRET_KEY;
      await this.jwtService.verifyAsync(token, { secret });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
