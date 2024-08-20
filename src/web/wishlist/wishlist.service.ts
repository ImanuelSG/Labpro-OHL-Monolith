import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}
  async create(filmId: string, userId: string) {
    try {
      const oldWistlist = await this.prisma.wishlist.findFirst({
        where: {
          filmId: filmId,
          userId: userId,
        },
      });

      if (oldWistlist) {
        return createResponse('error', 'Film already in wishlist', null, HttpStatus.FORBIDDEN);
      }

      const wishlist = await this.prisma.wishlist.create({
        data: {
          filmId: filmId,
          userId: userId,
        },
      });

      return createResponse('success', 'Film added to wishlist', wishlist);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to add film to wishlist',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(userId: string) {
    try {
      const wishlist = await this.prisma.wishlist.findMany({
        where: {
          userId: userId,
        },
      });

      return createResponse('success', 'Wishlist retrieved successfully', wishlist);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve wishlist',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const wishlist = await this.prisma.wishlist.findUnique({
        where: {
          id: id,
        },
      });

      if (!wishlist) {
        return createResponse('error', 'Film not found in wishlist', null, HttpStatus.NOT_FOUND);
      }

      await this.prisma.wishlist.delete({
        where: {
          id: id,
        },
      });

      return createResponse('success', 'Film removed from wishlist', null);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to remove film from wishlist',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
