import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class NotAuthedGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const response = context.switchToHttp().getResponse();
      const isAuthenticated = await super.canActivate(context);
      if (isAuthenticated) {
        response.redirect('/');
        return false;
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return true;
      }
    }
  }
}
