import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('API Ventas')
    .setDescription('API realizada para el Trabajo Práctico Integrador de Técnicas Avanzadas en Programación - UP 2C 2020')
    .setVersion('1.0')
    .addTag('sales')
    .addTag('products')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(SERVER_PORT);
}
bootstrap();
