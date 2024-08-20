import { Controller, Get, Post, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { UserGuard } from 'src/guard/user-auth-guard';

@Controller('wishlist')
@UseGuards(UserGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':id')
  create(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub;
    return this.wishlistService.create(id, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.sub;
    return this.wishlistService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
