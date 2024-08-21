import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Check if the user is set by the middleware
    const user = request['user'];

    if (!user) {
      throw new UnauthorizedException('No token is provided');
    }

    return true;
  }
}
