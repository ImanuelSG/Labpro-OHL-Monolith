import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { WebLoginDto } from './dto/web-login.dto';
import { createResponse } from 'src/common/response.util';
import { PrismaService } from 'prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(@Res() res: Response, loginDto: WebLoginDto) {
    const { username, password } = loginDto;

    if (!username || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          createResponse('error', 'Invalid username or password', null, HttpStatus.BAD_REQUEST),
        );
    }

    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ username }, { email: username }] },
      });

      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json(createResponse('error', 'No user found', null, HttpStatus.NOT_FOUND));
      }

      if (user.role !== 'USER') {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json(
            createResponse('error', 'Account is not a user account', null, HttpStatus.FORBIDDEN),
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

      if (!isPasswordValid) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(createResponse('error', 'Invalid password', null, HttpStatus.UNAUTHORIZED));
      }

      // Create JWT payload with user role
      const payload = { sub: user.id, username: user.username, role: user.role };
      const token = await this.jwtService.signAsync(payload);

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res
        .status(HttpStatus.OK)
        .json(createResponse('success', 'Login successful', { username }));
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          createResponse(
            'error',
            error.message || 'Failed to Login',
            null,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  }

  async logout(@Res() res: Response) {
    res.clearCookie('authToken');

    return res.status(HttpStatus.OK).json(createResponse('success', 'Logout successful', null));
  }
}
