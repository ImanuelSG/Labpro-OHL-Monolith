import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, PrismaService, CloudinaryService],
})
export class FilmsModule {}
