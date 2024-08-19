import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilmsController } from './films/films.controller';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { FilmsService } from './films/films.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilmsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, AuthController, FilmsController, UserController],
  providers: [AppService, AuthService, PrismaService, FilmsService, CloudinaryService, UserService],
})
export class AppModule {}
