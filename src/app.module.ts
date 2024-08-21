import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from './films/films.module';
import { WebFilmsModule } from './web/web-films/web-films.module';
import { WebAuthModule } from './web/web-auth/web-auth.module';
import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './web/wishlist/wishlist.module';
import { TransactionModule } from './web/transaction/transaction.module';
import { JwtMiddleware } from './middleware/middleware';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilmsModule,
    AuthModule,
    UserModule,
    WebFilmsModule,
    WebAuthModule,
    WishlistModule,
    TransactionModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
