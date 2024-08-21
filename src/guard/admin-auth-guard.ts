import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class AdminGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, execute the parent JwtAuthGuard to validate the JWT
    const response = context.switchToHttp().getResponse();
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      response.redirect('/login');
      return false;
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
