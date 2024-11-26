import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
