import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class AddBalanceDto {
  @ApiProperty()
  @IsPositive({ message: 'Amount must be positive' })
  increment: number;
}
