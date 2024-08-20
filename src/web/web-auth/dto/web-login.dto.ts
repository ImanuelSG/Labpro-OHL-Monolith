import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WebLoginDto {
  @ApiProperty({
    description: 'The username or email of the User.',
    example: 'john_doe || john_doe@example.com',
  })
  @IsString({
    message: 'Username or Email must be a string ',
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
