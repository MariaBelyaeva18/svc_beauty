import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    origin: true,
  });

  // Раздача статических файлов
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
