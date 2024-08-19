import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { createResponse } from 'src/common/response.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (!username || !password) {
      return createResponse('error', 'Invalid username or password', null, HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        return createResponse('error', 'No user found', null, HttpStatus.NOT_FOUND);
      }

      if (user.role !== 'ADMIN') {
        return createResponse(
          'error',
          'Account is not an admin account',
          null,
          HttpStatus.FORBIDDEN,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

      if (!isPasswordValid) {
        return createResponse('error', 'Invalid password', null, HttpStatus.UNAUTHORIZED);
      }

      // Create JWT payload with user role
      const payload = { sub: user.id, username: user.username, role: user.role };
      const token = await this.jwtService.signAsync(payload);

      return createResponse('success', 'Login successful', { username, token });
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to Login',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSelf(userId: string, token: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return createResponse('error', 'User not found', null, HttpStatus.NOT_FOUND);
      }

      const { username } = user;
      return createResponse('success', 'User found', { username, token });
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Internal server error',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logout() {
    try {
      // Handle any logout operations here, if necessary.
      return createResponse('success', 'Logout successful', null);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to logout',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
