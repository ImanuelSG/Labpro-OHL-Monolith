import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user-auth-guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':filmId')
  @UseGuards(UserGuard)
  async create(
    @Param('filmId') filmId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    const username = req.user.username;

    return await this.reviewsService.create(createReviewDto, username, filmId);
  }

  @Get(':filmId')
  async findAll(@Param('filmId') filmId: string) {
    // Filter reviews by filmId
    return await this.reviewsService.findAll(filmId);
  }
}
