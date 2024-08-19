import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createResponse } from 'src/common/response.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype === 'video/mp4') {
          callback(null, true);
        } else {
          callback(new Error('Only .mp4 format allowed for video files!'), false);
        }
      },
    }),
    FileInterceptor('cover_image', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(new Error('Only image formats are allowed for cover image!'), false);
        }
      },
    }),
  )
  async create(
    @Body() createFilmDto: CreateFilmDto,
    @UploadedFile() file: Express.Multer.File,
    @UploadedFile() cover_image?: Express.Multer.File,
  ) {
    try {
      return await this.filmsService.create(createFilmDto, file, cover_image);
    } catch (error) {
      return createResponse('error', 'Internal Server Error', null);
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
