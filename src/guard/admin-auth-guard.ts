import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class AdminGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    // Check if the user has an admin role
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true;
  }
}
