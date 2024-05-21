import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //////
  app.useGlobalPipes(new ValidationPipe());
  //////
  const config = new DocumentBuilder()
    .setTitle('Capstone Pinterest Swagger')
    .setDescription("Pinterest replica apis")
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    }, "access-token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  //////

  //app.use(express.static("public"));
  await app.listen(8080);
}
bootstrap();
