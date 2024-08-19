import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { IsNotEmail } from 'src/common/is-not-email';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user. Must be a valid email address.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'The username of the user. Must be unique and can contain letters and numbers.',
    example: 'john_doe',
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @IsNotEmail({ message: 'Username cannot be an email address' })
  username: string;

  @ApiProperty({
    description:
      'Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one lowercase letter.',
    example: 'StrongPass1',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Password is too weak. It must be at least 8 characters long, contain at least one number, one uppercase letter, and one lowercase letter.',
  })
  password: string;

  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;
}
