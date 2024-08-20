import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { WebFilmsService } from './web-films.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('web-films')
@Controller('web-films')
export class WebFilmsController {
  constructor(
    private readonly webFilmsService: WebFilmsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('films')
  async findAll(
    @Query('q') query?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.webFilmsService.findAll(query, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    let userId: string | null = null;

    // Check if there's a token in the Authorization header or cookies
    if (req.headers['authorization'] || req.cookies['jwt']) {
      const token = this.extractToken(req);
      if (token) {
        try {
          const payload = this.jwtService.verify(token);
          userId = payload.sub; // Assuming the JWT payload has a 'sub' field containing userId
        } catch (err) {
          // Token is invalid or expired, proceed without userId
        }
      }
    }

    return this.webFilmsService.findOne(id, userId);
  }

  // Helper method to extract token from either header or cookie
  private extractToken(req: Request): string | null {
    let token: string | null = null;

    // Check Authorization header
    if (req.headers['authorization']) {
      const parts = req.headers['authorization'].split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    // Check cookie
    if (!token && req.cookies['jwt']) {
      token = req.cookies['jwt'];
    }

    return token;
  }
}
