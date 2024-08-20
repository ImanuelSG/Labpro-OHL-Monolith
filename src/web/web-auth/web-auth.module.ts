import { Module } from '@nestjs/common';
import { WebAuthService } from './web-auth.service';
import { WebAuthController } from './web-auth.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [WebAuthController],
  providers: [WebAuthService, PrismaService],
})
export class WebAuthModule {}
