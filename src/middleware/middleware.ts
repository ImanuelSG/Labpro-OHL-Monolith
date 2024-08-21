import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    let token = this.extractTokenFromHeader(req);

    if (!token) {
      token = this.extractTokenFromCookie(req);
    }

    if (token) {
      try {
        const payload = this.jwtService.verify(token);
        req['user'] = payload;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    next();
  }

  protected extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }

  protected extractTokenFromCookie(request: Request): string | null {
    const cookieHeader = request.headers['cookie'];
    if (!cookieHeader) {
      return null;
    }

    const cookies = cookieHeader.split(';').map((x) => x.trim());
    const cookie = cookies.reduce((acc, x) => {
      const [key, value] = x.split('=');
      acc[key] = value;
      return acc;
    }, {});

    return cookie['authToken'] || null;
  }
}
