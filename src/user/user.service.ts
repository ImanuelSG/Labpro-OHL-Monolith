import { HttpStatus, Injectable } from '@nestjs/common';
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
      // Validate if the username or email is already taken
      const isTakenUsernameOrEmail = await this.prisma.user.findFirst({
        where: {
          OR: [{ username: createUserDto.username }, { email: createUserDto.email }],
        },
      });

      if (isTakenUsernameOrEmail) {
        return createResponse('error', 'Username or Email taken', null, HttpStatus.BAD_REQUEST);
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
      return createResponse(
        'error',
        error.message || 'Failed to create user',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findWithQuery(query?: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: query
          ? {
              username: {
                contains: query,
                mode: 'insensitive',
              },
            }
          : {},
        select: {
          id: true,
          email: true,
          username: true,
          balance: true,
        },
      });

      return createResponse('success', 'Users retrieved successfully', users);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve users',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          balance: true,
        },
      });

      if (!user) {
        return createResponse('error', 'No user found', null, HttpStatus.NOT_FOUND);
      }

      return createResponse('success', 'User retrieved successfully', user);
    } catch (error) {
      return createResponse(
        'error',
        error.message || `Failed to retrieve user with id ${id}`,
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addBalance(id: string, addBalanceDto: AddBalanceDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return createResponse('error', 'No user found', null, HttpStatus.NOT_FOUND);
      }

      const { increment } = addBalanceDto;

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          balance: user.balance + increment,
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
      return createResponse(
        'error',
        error.message || 'Failed to add balance',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

      return createResponse('success', 'User deleted successfully', user);
    } catch (error) {
      return createResponse(
        'error',
        error.message || `Failed to delete user with id ${id}`,
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
