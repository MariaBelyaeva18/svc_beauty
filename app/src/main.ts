import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Beauty')
    .setDescription('The beauty API description')
    .setVersion('1.0.0')
    .addTag('beauty')
    .build();

  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
