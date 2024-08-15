import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsArray()
  genre: string[];

  @ApiProperty()
  @IsNumber()
  release_year: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  video: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  cover_image: any | null;
}
