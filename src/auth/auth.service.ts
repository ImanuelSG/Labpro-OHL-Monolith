import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { createResponse } from 'src/common/response.util';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async Login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (!username || !password) {
      return createResponse('error', 'invalid username or password', null);
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return createResponse('error', 'No user found', null);
      }

      if (!(await bcrypt.compare(password, user.hashedPassword))) {
        return createResponse('error', 'Invalid password', null);
      }

      return createResponse('success', 'Login successful', user);
    } catch (error) {
      return createResponse('error', 'Internal server error', null);
    }
  }

  getSelf() {}

  async logout() {}
}
