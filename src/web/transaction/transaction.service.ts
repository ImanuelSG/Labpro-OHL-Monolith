import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, filmId: string) {
    try {
      // Check if the user has already bought the film
      const oldBoughtFilm = await this.prisma.transaction.findUnique({
        where: {
          filmId_userId: {
            filmId,
            userId: userId,
          },
        },
      });

      if (oldBoughtFilm) {
        return createResponse(
          'error',
          'You have already bought this film',
          null,
          HttpStatus.CONFLICT,
        );
      }

      // Fetch user balance and film price in parallel
      const [user, film] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          select: { balance: true },
        }),
        this.prisma.film.findUnique({
          where: { id: filmId },
          select: { price: true },
        }),
      ]);

      if (!user || !film) {
        return createResponse('error', 'User or film not found', null, HttpStatus.NOT_FOUND);
      }

      if (user.balance < film.price) {
        return createResponse(
          'error',
          'Insufficient balance to buy film',
          null,
          HttpStatus.BAD_REQUEST,
        );
      }

      // New buy, decrement, delete wishlist if any
      const [newTransaction] = await Promise.all([
        this.prisma.transaction.create({
          data: {
            boughtAt: new Date(),
            filmId,
            userId: userId,
          },
        }),
        this.prisma.user.update({
          where: { id: userId },
          data: { balance: { decrement: film.price } },
        }),
        this.prisma.wishlist.deleteMany({
          where: {
            filmId,
            userId,
          },
        }),
      ]);

      return createResponse(
        'success',
        'Film purchased successfully',
        newTransaction,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return createResponse(
        'error',
        error.message ?? 'Failed to buy film',
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(userId: string) {
    try {
      const boughtFilms = await this.prisma.transaction.findMany({
        where: {
          userId,
        },
        include: {
          Film: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              rating: true,
            },
          },
        },
      });

      return createResponse(
        'success',
        'Bought films retrieved successfully',
        boughtFilms,
        HttpStatus.OK,
      );
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve bought films',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
