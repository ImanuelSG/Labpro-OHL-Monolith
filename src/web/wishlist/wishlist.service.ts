import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}
  async create(filmId: string, userId: string) {
    try {
      const existingWishlist = await this.prisma.wishlist.findUnique({
        where: {
          filmId_userId: {
            filmId: filmId,
            userId: userId,
          },
        },
      });

      if (existingWishlist) {
        // Remove from wishlist if it already exists
        await this.prisma.wishlist.delete({
          where: {
            id: existingWishlist.id,
          },
        });
        return createResponse('success', 'Film removed from wishlist', null);
      } else {
        // Add to wishlist if it doesn't exist
        const newWishlist = await this.prisma.wishlist.create({
          data: {
            filmId: filmId,
            userId: userId,
          },
        });
        return createResponse('success', 'Film added to wishlist', newWishlist);
      }
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to update wishlist',
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
}
