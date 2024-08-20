import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class UserGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    // Check if the user has the 'user' role
    if (user.role !== 'user') {
      throw new ForbiddenException('Access denied: Users only');
    }

    return true;
  }
}
