import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The rating of the review. Must be a number between 1 and 5.',
    example: 5,
  })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsNotEmpty({ message: 'Rating cannot be empty' })
  rating: number;

  @ApiProperty({
    description: 'The content of the review.',
    example: 'This product is amazing!',
  })
  @IsString({ message: 'Review must be a string' })
  @IsNotEmpty({ message: 'Review cannot be empty' })
  review: string;
}
