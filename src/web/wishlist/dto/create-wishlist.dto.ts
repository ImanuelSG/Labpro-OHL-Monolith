import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    description: 'The id of the film to be wished.',
    example: '1',
  })
  @IsString({ message: 'Film ID must be a string' })
  @IsNotEmpty({ message: 'Film ID is required' })
  filmId: string;

  @ApiProperty({
    description: 'The id of the user wishing the film.',
    example: '1',
  })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
