import { Controller, Get, Param, Query, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from './guard/user-auth-guard';
import { NotAuthedGuard } from './guard/not-authed-guard';

@ApiTags('website')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('main')
  async getMain(
    @Req() req,
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '6',
  ) {
    const userId = req.user?.sub ?? null;
    return await this.appService.getMainPageData(userId, query, page, limit);
  }

  @Get('/register')
  @Render('register')
  async getRegisterPage(@Req() req) {
    const userId = req.user?.sub ?? null;
    return await this.appService.getRegisterPageData(userId);
  }

  @Get('/login')
  @Render('login')
  @UseGuards(NotAuthedGuard)
  getLoginPage() {
    return {};
  }

  @Get('/film/:id')
  @Render('filmdetail')
  async getFilmDetailPage(@Param('id') id: string, @Req() req) {
    const userId = req.user?.sub ?? null;
    return await this.appService.getFilmDetailPageData(userId, id);
  }

  @Get('/bought-films')
  @Render('bought')
  @UseGuards(UserGuard)
  async getBoughtFilmsPage(
    @Req() req,
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '6',
  ) {
    const userId = req.user.sub;
    return await this.appService.getBoughtFilmsPageData(userId, query, page, limit);
  }

  @Get('/wishlist')
  @Render('wishlist')
  @UseGuards(UserGuard)
  async getWishlistPage(
    @Req() req,
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '6',
  ) {
    const userId = req.user.sub;
    return await this.appService.getWishlistPageData(userId, query, page, limit);
  }
}
