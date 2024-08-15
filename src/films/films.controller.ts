import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    try {
      return await this.filmsService.create(createFilmDto);
    } catch (error) {
      return { error: 'Failed to create film' };
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.filmsService.findAll();
    } catch (error) {
      return { error: 'Failed to retrieve films' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.filmsService.findOne(id);
    } catch (error) {
      return { error: 'Failed to retrieve film' };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    try {
      return await this.filmsService.update(id, updateFilmDto);
    } catch (error) {
      return { error: 'Failed to update film' };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.filmsService.remove(id);
    } catch (error) {
      return { error: 'Failed to delete film' };
    }
  }
}
