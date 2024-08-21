import { Controller, Get, Param, Query, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { createResponse } from './common/response.util';
import { NotAuthedGuard } from './guard/not-authed-guard';
import { UserGuard } from './guard/user-auth-guard';

@ApiTags('website')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('main')
  async getMain(
    @Req() req,
    @Query('q') query: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '6',
  ) {
    try {
      const isAuthenticated = req.user ? true : false;
      let data = null;
      if (isAuthenticated) {
        const res = await this.appService.getBalance(req.user.sub);
        data = res.data;
      }
      const res = await this.appService.getFilms(query, page, limit);
      const { films, totalPages } = res.data;

      return {
        isAuthenticated,
        films,
        query,
        page: parseInt(page, 10),
        totalPages,
        balance: data,
      };
    } catch (error) {
      return createResponse('error', 'Internal server error', null, 500);
    }
  }

  @Get('/register')
  @Render('register')
  getRegisterPage() {
    return {};
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
    try {
      const userId = req.user?.sub ?? null;

      const isAuthenticated = userId ? true : false;
      const res = await this.appService.getFilmById(id, userId);

      const { film, isBought, isWished, sortedRecommendedFilms } = res.data;

      return {
        isAuthenticated,
        film,
        isBought,
        isWished,
        sortedRecommendedFilms,
      };
    } catch (error) {
      return createResponse('error', 'Internal server error', null, 500);
    }
  }

  @Get('/bought-films')
  @Render('bought')
  @UseGuards(UserGuard)
  async getBoughtFilmsPage(
    @Req() req,
    @Query('q') query: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '6',
  ) {
    try {
      const userId = req.user.sub;
      const res = await this.appService.getBalance(userId);
      const boughtFilmsRes = await this.appService.getBoughtFilms(userId, query, page, limit);

      const balance = res.data;

      const { films, totalPages } = boughtFilmsRes.data;

      return {
        isAuthenticated: true,
        balance,
        films,
        query,
        page: parseInt(page, 10),
        totalPages,
      };
    } catch (error) {
      console.log('error', error);
      return createResponse('error', 'Internal server error', null, 500);
    }
  }
}
