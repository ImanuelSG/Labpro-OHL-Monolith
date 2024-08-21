import { Controller, Get, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { UserGuard } from 'src/guard/user-auth-guard';

@Controller('wishlist')
@UseGuards(UserGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Patch(':filmId')
  async create(@Param('filmId') filmId: string, @Req() req) {
    const userId = req.user.sub;
    return this.wishlistService.create(filmId, userId);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub;
    return this.wishlistService.findAll(userId);
  }
}
