import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user-auth-guard';

@ApiTags('Bought films')
@Controller('transaction')
@UseGuards(UserGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':filmId')
  async create(@Param('filmId') filmId: string, @Req() req) {
    console.log('filmId', filmId);

    const userId = req.user.sub;

    console.log('userId', userId);
    return this.transactionService.create(userId, filmId);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub;
    return this.transactionService.findAll(userId);
  }
}
