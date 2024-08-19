import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { createResponse } from 'src/common/response.util';

@Injectable()
export class FilmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    try {
      const films = await this.prisma.film.findMany();
      return createResponse('success', 'Films retrieved successfully', films);
    } catch (error) {
      return createResponse('error', 'Failed to retrieve films', null);
    }
  }

  async findOne(id: string) {
    try {
      const film = await this.prisma.film.findUnique({ where: { id } });

      if (!film) {
        return createResponse('error', 'Film not found', null);
      }

      return createResponse('success', 'Film retrieved successfully', film);
    } catch (error) {
      return createResponse('error', 'Failed to retrieve film', null);
    }
  }

  async create(
    createFilmDto: CreateFilmDto,
    file: Express.Multer.File,
    cover_image?: Express.Multer.File,
  ) {
    try {
      // Upload the video file to Cloudinary
      const videoResult = await this.cloudinaryService.uploadImage(file);

      let coverImageUrl: string | null = null;

      if (cover_image) {
        // Upload the cover image to Cloudinary
        const coverImageResult = await this.cloudinaryService.uploadImage(cover_image);
        coverImageUrl = coverImageResult.secure_url;
      }

      const { title, description, director, release_year, genre, price, duration } = createFilmDto;

      // Check if the film already exists
      const oldFilm = await this.prisma.film.findFirst({ where: { title } });

      if (oldFilm) {
        return createResponse('error', 'Film already exists', null);
      }

      // Save the film details and video URL in the database
      const film = await this.prisma.film.create({
        data: {
          title,
          description,
          director,
          release_year,
          genre,
          price,
          duration,
          cover_image: coverImageUrl,
          video_url: videoResult.secure_url,
        },
      });

      return createResponse('success', 'Film created successfully', film);
    } catch (error) {
      return createResponse('error', 'Failed to create film', null);
    }
  }

  async update(
    id: string,
    updateFilmDto: UpdateFilmDto,
    file?: Express.Multer.File,
    cover_image?: Express.Multer.File,
  ) {
    try {
      const existingFilm = await this.prisma.film.findUnique({ where: { id } });

      if (!existingFilm) {
        return createResponse('error', 'Film not found', null);
      }

      let video_url = existingFilm.video_url;
      let cover_image_url = existingFilm.cover_image;

      if (file) {
        // Delete the old video from Cloudinary
        const oldVideoPublicId = this.extractPublicId(existingFilm.video_url);
        await this.cloudinaryService.deleteImage(oldVideoPublicId);

        // Upload the new video to Cloudinary
        const videoResult = await this.cloudinaryService.uploadImage(file);
        video_url = videoResult.secure_url;
      }

      if (cover_image) {
        // Delete the old cover image from Cloudinary
        if (existingFilm.cover_image) {
          const oldCoverImagePublicId = this.extractPublicId(existingFilm.cover_image);
          await this.cloudinaryService.deleteImage(oldCoverImagePublicId);
        }

        // Upload the new cover image to Cloudinary
        const coverImageResult = await this.cloudinaryService.uploadImage(cover_image);
        cover_image_url = coverImageResult.secure_url;
      }

      const film = await this.prisma.film.update({
        where: { id },
        data: {
          ...updateFilmDto,
          video_url,
          cover_image: cover_image_url,
        },
      });

      return createResponse('success', 'Film updated successfully', film);
    } catch (error) {
      return createResponse('error', 'Failed to update film', null);
    }
  }

  async remove(id: string) {
    try {
      const existingFilm = await this.prisma.film.findUnique({ where: { id } });

      if (!existingFilm) {
        throw new NotFoundException('Film not found');
      }

      // Delete the video from Cloudinary
      const publicId = this.extractPublicId(existingFilm.video_url);
      await this.cloudinaryService.deleteImage(publicId);

      // Delete the film from the database
      const film = await this.prisma.film.delete({ where: { id } });

      return createResponse('success', 'Film deleted successfully', film);
    } catch (error) {
      throw new Error('Failed to delete film');
    }
  }

  private extractPublicId(url: string): string {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('.')[0]; // Extract public_id from the URL
  }
}
