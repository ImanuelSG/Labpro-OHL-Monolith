import { Module } from '@nestjs/common';
import { WebFilmsService } from './web-films.service';
import { WebFilmsController } from './web-films.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [WebFilmsController],
  providers: [WebFilmsService, PrismaService],
  exports: [WebFilmsService],
})
export class WebFilmsModule {}
