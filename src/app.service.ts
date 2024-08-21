import { Injectable } from '@nestjs/common';
import { WebFilmsService } from './web/web-films/web-films.service';
import { createResponse } from './common/response.util';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly filmService: WebFilmsService,
    private readonly userService: UserService,
  ) {}
  async getFilms(query: string, page: string, limit: string) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return createResponse('error', 'Invalid page or limit', null, 400);
    }

    const { data } = await this.filmService.findAll(query, pageNumber, limitNumber);
    const { films, totalCount } = data;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return createResponse('success', 'Films fetched', { films, totalPages });
  }

  async getFilmById(id: string, userId: string) {
    const data = await this.filmService.findOne(id, userId);

    return data;
  }

  async getBalance(userId: string) {
    const user = await this.userService.findOne(userId);

    const { balance } = user.data;

    if (!user) {
      return createResponse('error', 'User not found', null, 404);
    }

    return createResponse('success', 'Balance fetched', balance);
  }

  async getBoughtFilms(userId: string, query: string, page: string, limit: string) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return createResponse('error', 'Invalid page or limit', null, 400);
    }

    const { data } = await this.filmService.getBoughtFilms(userId, query, pageNumber, limitNumber);

    const { films, totalCount } = data;
    const totalPages = Math.ceil(totalCount / limitNumber);

    return createResponse('success', 'Bought films fetched', { films, totalPages });
  }
}
