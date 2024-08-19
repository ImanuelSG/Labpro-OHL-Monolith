import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';
import * as bcrypt from 'bcrypt';
import { AddBalanceDto } from './dto/add-balance.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Validasi apakah username atau email sudah digunakan
      const isTakenUsernameOrEmail = await this.prisma.user.findFirst({
        where: {
          OR: [{ username: createUserDto.username }, { email: createUserDto.email }],
        },
      });

      if (isTakenUsernameOrEmail) {
        return createResponse('error', 'Username or Email taken', null);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const { email, username, firstName, lastName } = createUserDto;

      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          hashedPassword,
          firstName,
          lastName,
        },
      });

      return createResponse('success', 'User created successfully', user);
    } catch (error) {
      return createResponse('error', 'Failed to create user', null);
    }
  }

  async findWithQuery(query?: string) {
    try {
      if (!query) {
        const users = this.prisma.user.findMany({
          select: {
            id: true,
            email: true,
            username: true,
            balance: true,
          },
        });
        return createResponse('success', 'Users retrieved successfully', users);
      } else {
        const users = this.prisma.user.findMany({
          where: {
            username: {
              contains: query,
            },
          },
          select: {
            id: true,
            email: true,
            username: true,
            balance: true,
          },
        });
        return createResponse('success', 'Users retrieved successfully', users);
      }
    } catch (error) {
      return createResponse('error', 'Failed to retrieve users', null);
    }
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async addBalance(id: string, addBalanceDto: AddBalanceDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return createResponse('error', 'No user found', null);
      }

      const { amount } = addBalanceDto;

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          balance: user.balance + amount,
        },
        select: {
          id: true,
          email: true,
          username: true,
          balance: true,
        },
      });

      return createResponse('success', 'Balance added successfully', updatedUser);
    } catch (error) {
      return createResponse('error', 'Failed to add balance', null);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          balance: true,
        },
      });

      if (!user) {
        return createResponse('error', 'No user found', null);
      }
      return createResponse('success', 'User deleted successfully', user);
    } catch {
      return createResponse('error', 'Failed to delete user', null);
    }
  }
}
