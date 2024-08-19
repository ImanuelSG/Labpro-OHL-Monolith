import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = this.validateRequest(request);

    if (!isAuthenticated) {
      throw new UnauthorizedException('You must be logged in to access this page.');
    }

    return isAuthenticated;
  }

  validateRequest(request): boolean {
    return request.session && request.session.isAuthenticated;
  }
}
