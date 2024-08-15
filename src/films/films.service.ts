import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmDto: CreateFilmDto) {
    try {
      const {
        title,
        description,
        director,
        release_year,
        genre,
        price,
        duration,
        cover_image,
        video,
      } = createFilmDto;

      const film = await this.prisma.film.create({
        data: {
          title,
          description,
          director,
          release_year,
          genre,
          price,
          duration,
          cover_image: cover_image || null,
          video_url: video.path, // Assuming you're saving the video URL/path
        },
      });

      return film;
    } catch (error) {
      throw new Error('Failed to create film');
    }
  }

  async findAll() {
    try {
      return this.prisma.film.findMany();
    } catch (error) {
      throw new Error('Failed to fetch films');
    }
  }

  async findOne(id: string) {
    try {
      // Adjust the type based on your use case
      const film = await this.prisma.film.findUnique({
        where: { id },
      });

      if (!film) {
        throw new NotFoundException('Film not found');
      }

      return film;
    } catch (error) {
      throw new Error('Failed to fetch film');
    }
  }

  async update(id: string, updateFilmDto: UpdateFilmDto) {
    try {
      const film = await this.prisma.film.update({
        where: { id },
        data: updateFilmDto,
      });

      if (!film) {
        throw new NotFoundException('Film not found');
      }

      return film;
    } catch (error) {
      throw new Error('Failed to update film');
    }
  }

  async remove(id: string) {
    try {
      const film = await this.prisma.film.delete({
        where: {
          id,
        },
      });

      if (!film) {
        throw new NotFoundException('Film not found');
      }

      return film;
    } catch (error) {
      throw new Error('Failed to delete film');
    }
  }
}
