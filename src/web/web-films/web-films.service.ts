import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class WebFilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: string, page: number = 1, limit: number = 6) {
    try {
      // Calculate total number of films matching the query
      const totalCount = await this.prisma.film.count({
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
      });

      // Calculate the number of pages
      const pageCount = Math.ceil(totalCount / limit);

      // Ensure page is within valid range
      const currentPage = Math.max(1, Math.min(page, pageCount));
      const skip = (currentPage - 1) * limit;

      // Retrieve films with pagination
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
        select: {
          id: true,
          title: true,
          director: true,
          rating: true,
          genre: true,
          release_year: true,
          cover_image_url: true,
        },
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      });

      return createResponse('success', 'Films retrieved successfully', {
        films,
        totalCount,
        page: currentPage,
        pageCount,
      });
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve films',
        null,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(filmId: string, userId: string | null) {
    try {
      let film;
      if (userId) {
        film = await this.prisma.film.findUnique({
          where: { id: filmId },
          include: {
            Reviews: {
              select: { username: true, rating: true, review: true },
            },
            Wishlist: {
              where: { userId },
              select: { id: true },
            },
            Transactions: {
              where: { userId },
              select: { id: true },
            },
          },
        });
      } else {
        film = await this.prisma.film.findUnique({
          where: { id: filmId },
          include: {
            Reviews: {
              select: { username: true, rating: true, review: true },
            },
          },
        });
      }

      if (!film) {
        return createResponse('error', 'Film not found', null, HttpStatus.NOT_FOUND);
      }

      // Determine if the film is bought or wished by the user
      const isBought = userId ? film.Transactions.length > 0 : false;
      const isWished = userId ? film.Wishlist.length > 0 : false;

      // Find recommended films based on matching genres
      const recommendedFilms = await this.prisma.film.findMany({
        where: {
          id: { not: filmId }, // Exclude the current film
          genre: { hasSome: film.genre }, // Match at least one genre
        },
        select: {
          id: true,
          title: true,
          director: true,
          rating: true,
          price: true,
          genre: true,
          release_year: true,
          cover_image_url: true,
        },
      });

      const sortedRecommendedFilms = recommendedFilms
        .map((film) => ({
          ...film,
          matchingGenresCount: film.genre.filter((genre) => film.genre.includes(genre)).length,
        }))
        .sort((a, b) => b.matchingGenresCount - a.matchingGenresCount)
        .slice(0, 6); // Take the top 5 films

      return createResponse('success', 'Film retrieved successfully', {
        film,
        isBought,
        isWished,
        sortedRecommendedFilms,
      });
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve the film',
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBoughtFilms(userId: string, query?: string, page: number = 1, limit: number = 6) {
    try {
      // Calculate total number of bought films matching the query
      const totalCount = await this.prisma.transaction.count({
        where: {
          userId,
          Film: query
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
        },
      });

      // Calculate the number of pages
      const pageCount = Math.ceil(totalCount / limit);

      // Ensure page is within valid range
      const currentPage = Math.max(1, Math.min(page, pageCount));
      const skip = (currentPage - 1) * limit;

      // Retrieve bought films with pagination
      const boughtFilms = await this.prisma.transaction.findMany({
        where: {
          userId,
          Film: query
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
        },
        include: {
          Film: {
            select: {
              id: true,
              title: true,
              director: true,
              rating: true,
              genre: true,
              release_year: true,
              cover_image_url: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { boughtAt: 'desc' },
      });

      const finalFilms = boughtFilms.map((film) => film.Film);

      return createResponse('success', 'Bought films retrieved successfully', {
        films: finalFilms,
        totalCount,
        page: currentPage,
        pageCount,
      });
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
