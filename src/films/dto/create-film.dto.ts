import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsInt,
  Max,
} from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of the film',
    example: 'Inception',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Description of the film',
    example: 'A mind-bending thriller by Christopher Nolan.',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Director of the film',
    example: 'Christopher Nolan',
  })
  @IsString({ message: 'Director must be a string' })
  @IsNotEmpty({ message: 'Director is required' })
  director: string;

  @ApiProperty({
    description: 'Genres of the film',
    type: [String],
    example: ['Sci-Fi', 'Thriller'],
  })
  @IsArray({ message: 'Genres must be an array' })
  @IsString({ each: true, message: 'Each genre must be a string' })
  @IsNotEmpty({ message: 'At least one genre is required' })
  genre: string[];

  @ApiProperty({
    description: 'Release year of the film',
    example: 2010,
  })
  @IsNumber({}, { message: 'Release year must be a number' })
  @IsPositive({ message: 'Release year must be a positive number' })
  @IsInt({ message: 'Release year must be an integer' })
  @Max(2024, { message: 'Release year must be less than or equal to 2024' })
  release_year: number;

  @ApiProperty({
    description: 'Price of the film',
    example: 19.99,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    description: 'Duration of the film in minutes',
    example: 148,
  })
  @IsNumber({}, { message: 'Duration must be a number' })
  @IsPositive({ message: 'Duration must be a positive number' })
  @IsInt({ message: 'Duration must be an integer' })
  duration: number;

  @ApiProperty({
    description: 'Video file of the film',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  video?: any;

  @ApiProperty({
    description: 'Cover image of the film',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  cover_image?: any | null;
}
