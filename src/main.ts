import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { mergeClasses } from './views/partials/helpers/mergeClasses';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', '/src/views'));

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://labpro-fe.hmif.dev'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }),
  );

  // Handlebars
  hbs.registerPartials(join(__dirname, '../..', '/src/views/partials'));
  hbs.registerHelper('mergeClasses', mergeClasses);
  app.setViewEngine('hbs');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Proflix API Documentation')
    .setDescription('API documentation for Proflix Monolith')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
