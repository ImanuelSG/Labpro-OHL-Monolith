import { Injectable } from '@nestjs/common';
import { WebFilmsService } from './web/web-films/web-films.service';
import { UserService } from './user/user.service';
import { WishlistService } from './web/wishlist/wishlist.service';

@Injectable()
export class AppService {
  constructor(
    private readonly filmService: WebFilmsService,
    private readonly userService: UserService,
    private readonly wishlistService: WishlistService,
  ) {}

  private parsePaginationParams(page: string, limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 6;

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new Error('Invalid page or limit');
    }

    return { pageNumber, limitNumber };
  }

  private async getBalanceData(userId: string | null) {
    if (!userId) return null;
    const user = await this.userService.findOne(userId);
    if (!user || !user.data) {
      throw new Error('User not found');
    }
    return user.data.balance;
  }

  private async getFilmsData(
    userId: string | null,
    query: string,
    pageNumber: number,
    limitNumber: number,
  ) {
    const filmsData = await this.filmService.findAll(query, pageNumber, limitNumber);
    const { films, totalCount } = filmsData.data;
    const totalPages = Math.ceil(totalCount / limitNumber);
    return { films, totalPages };
  }

  async getMainPageData(userId: string | null, query: string, page: string, limit: string) {
    const { pageNumber, limitNumber } = this.parsePaginationParams(page, limit);

    const [filmsResult, balance] = await Promise.all([
      this.getFilmsData(userId, query, pageNumber, limitNumber),
      this.getBalanceData(userId),
    ]);

    return {
      isAuthenticated: !!userId,
      films: filmsResult.films,
      query,
      page: pageNumber,
      totalPages: filmsResult.totalPages,
      balance,
    };
  }

  async getRegisterPageData(userId: string | null) {
    const balance = await this.getBalanceData(userId);
    return {
      isAuthenticated: !!userId,
      balance,
    };
  }

  async getFilmDetailPageData(userId: string | null, filmId: string) {
    const isAuthenticated = !!userId;

    const [filmData, balance] = await Promise.all([
      this.filmService.findOne(filmId, userId),
      this.getBalanceData(userId),
    ]);

    const { film, isBought, isWished, sortedRecommendedFilms } = filmData.data;

    return {
      isAuthenticated,
      balance,
      film,
      isBought,
      isWished,
      sortedRecommendedFilms,
    };
  }

  async getBoughtFilmsPageData(userId: string, query: string, page: string, limit: string) {
    const { pageNumber, limitNumber } = this.parsePaginationParams(page, limit);

    const [boughtFilmsData, balance] = await Promise.all([
      this.filmService.getBoughtFilms(userId, query, pageNumber, limitNumber),
      this.getBalanceData(userId),
    ]);

    const { films, totalCount } = boughtFilmsData.data;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      isAuthenticated: true,
      balance,
      films,
      query,
      page: pageNumber,
      totalPages,
    };
  }

  async getWishlistPageData(userId: string, query: string, page: string, limit: string) {
    const { pageNumber, limitNumber } = this.parsePaginationParams(page, limit);

    const [wishlistData, balance] = await Promise.all([
      this.wishlistService.findAll(userId, query, pageNumber, limitNumber),
      this.getBalanceData(userId),
    ]);

    const { wishlist, totalCount } = wishlistData.data;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return {
      isAuthenticated: true,
      films: wishlist,
      balance,
      query,
      page: pageNumber,
      totalPages,
    };
  }
}
