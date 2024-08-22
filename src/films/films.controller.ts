import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin-auth-guard';

@ApiTags('Films')
@Controller('films')
@UseGuards(AdminGuard)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video' }, { name: 'cover_image' }]))
  @ApiConsumes('multipart/form-data')
  async create(@UploadedFiles() files, @Body() createFilmDto: CreateFilmDto) {
    const { video, cover_image } = files;
    return await this.filmsService.create(createFilmDto, video, cover_image);
  }

  @Get()
  async findAll(@Query('q') query?: string) {
    return await this.filmsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.filmsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video' }, { name: 'cover_image' }]))
  @ApiConsumes('multipart/form-data')
  async update(
    @UploadedFiles() files,
    @Param('id') id: string,
    @Body() updateFilmDto: CreateFilmDto,
  ) {
    const { video, cover_image } = files;
    return await this.filmsService.update(id, updateFilmDto, video, cover_image);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.filmsService.remove(id);
  }
}
