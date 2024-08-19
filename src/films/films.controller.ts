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
  Query,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
    return await this.filmsService.create(createFilmDto, file, cover_image);
  }

  @Get()
  async findAll(@Query('q') query?: string) {
    const result = await this.filmsService.findAll(query);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.filmsService.findOne(id);
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    const result = await this.filmsService.update(id, updateFilmDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.filmsService.remove(id);
    return result;
  }
}
