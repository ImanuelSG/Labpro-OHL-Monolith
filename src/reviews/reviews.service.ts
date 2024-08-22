import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'prisma/prisma.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto, username: string, filmId: string) {
    try {
      const { rating, review } = createReviewDto;

      const filmQuery = this.prisma.film.findUnique({
        where: {
          id: filmId,
        },
      });

      const userQuery = this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      const [film, user] = await Promise.all([filmQuery, userQuery]);

      if (!film || !user) {
        return createResponse('error', 'Film or user not found', null, 404);
      }

      const reviewData = await this.prisma.review.create({
        data: {
          rating,
          review,
          username,
          filmId,
        },
      });

      if (!reviewData) {
        return {
          status: 400,
          message: 'Failed to create review',
        };
      }

      // Update the film's rating

      const { ratingCount } = film;
      const newRatingCount = ratingCount + 1;
      const newRating = (film.rating * ratingCount + rating) / newRatingCount;

      await this.prisma.film.update({
        where: {
          id: filmId,
        },
        data: {
          rating: newRating,
          ratingCount: newRatingCount,
        },
      });

      return createResponse('success', 'Review created successfully', reviewData);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to create review',
        null,
        error.status || 500,
      );
    }
  }

  async findAll(filmId: string) {
    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          filmId,
        },
        select: {
          id: true,
          rating: true,
          review: true,
          username: true,
          createdAt: true,
        },
      });

      return createResponse('success', 'Reviews retrieved successfully', reviews);
    } catch (error) {
      return createResponse(
        'error',
        error.message || 'Failed to retrieve reviews',
        null,
        error.status || 500,
      );
    }
  }
}
