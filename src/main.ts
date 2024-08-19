import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { mergeClasses } from './views/partials/helpers/mergeClasses';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', '/src/views'));

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Handlebars
  hbs.registerPartials(join(__dirname, '../..', '/src/views/partials'));
  hbs.registerHelper('mergeClasses', mergeClasses);
  app.setViewEngine('hbs');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Proflix API DOcumentation')
    .setDescription('API documentation for Proflix Monolith')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
