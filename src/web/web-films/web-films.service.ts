import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class WebFilmsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query?: string, page: number = 1, limit: number = 8) {
    try {
      const pageCount = (await this.prisma.film.count()) / limit;
      const skip = (Math.min(page, pageCount) - 1) * limit;

      const films = await this.prisma.film.findMany({
        where: query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  director: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {},
        skip,
        take: limit,
      });

      return createResponse('success', 'Films retrieved successfully', films);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve Films',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, userId: string | null) {
    try {
      const film = await this.prisma.film.findUnique({
        where: { id: id },
        include: {
          Reviews: { select: { username: true, Rating: true, Review: true } },
          Wishlist: {
            where: { userId: userId },
            select: { id: true },
          },
        },
      });

      if (!film) {
        return createResponse('error', 'Film not found', null, HttpStatus.NOT_FOUND);
      }

      return createResponse('success', 'Film retrieved successfully', film);
    } catch (error) {
      return createResponse('error', 'Film not found', null, HttpStatus.NOT_FOUND);
    }
  }
}
