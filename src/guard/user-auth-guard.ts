import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class UserGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response = context.switchToHttp().getResponse();
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      response.redirect('/login');
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    // Check if the user has the 'user' role
    if (user.role !== 'USER') {
      throw new ForbiddenException('Access denied: Users only');
    }

    return true;
  }
}
