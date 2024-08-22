import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { WebFilmsService } from './web-films.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('web-films')
@Controller('web-films')
export class WebFilmsController {
  constructor(private readonly webFilmsService: WebFilmsService) {}

  @Get('films')
  async findAll(
    @Query('q') query?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.webFilmsService.findAll(query, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user?.sub ?? null;

    return this.webFilmsService.findOne(id, userId);
  }
}
