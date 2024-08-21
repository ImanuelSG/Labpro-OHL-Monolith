import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import {
  mergeClasses,
  range,
  getPartialStarOpacity,
  isPartialStar,
  formatTime,
} from './views/partials/helpers/helpers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

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
  hbs.registerHelper('range', range);
  hbs.registerHelper('isPartialStar', isPartialStar);
  hbs.registerHelper('getPartialStarOpacity', getPartialStarOpacity);
  hbs.registerHelper('lt', (a, b) => a < b);
  hbs.registerHelper('gt', (a, b) => a > b);
  hbs.registerHelper('eq', (a, b) => a == b);
  hbs.registerHelper('add', (a, b) => a + b);
  hbs.registerHelper('subtract', (a, b) => a - b);
  hbs.registerHelper('slice', (array, start, end) => array.slice(start, end));
  hbs.registerHelper('multiply', (a, b) => a * b);
  hbs.registerHelper('mulSub', (a, b, c) => (a - b) * c);
  hbs.registerHelper('format', formatTime);
  hbs.registerHelper('and', (a, b) => a && b);
  hbs.registerHelper('neq', (a, b) => a != b);
  app.setViewEngine('hbs');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Proflix API Documentation')
    .setDescription('API documentation for Proflix Monolith')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
