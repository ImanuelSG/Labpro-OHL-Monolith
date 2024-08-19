import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The username of the Admin.',
    example: 'john_doe',
  })
  @IsString({
    message: 'Username must be a string ',
  })
  @IsNotEmpty({ message: 'Username or Email is required' })
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'StrongPass1',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
