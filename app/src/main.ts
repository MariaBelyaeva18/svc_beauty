import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { VALIDATION_ERROR } from './messages/validation.messages';

const buildErrorList = (errors) =>
  errors.reduce((acc, err) => {
    const key = err.property;
    const hasChildren = Array.isArray(err.children) && err.children.length > 0;
    const constraints = err.constraints ? Object.values(err.constraints) : [];

    if (hasChildren) {
      return { ...acc, [key]: buildErrorList(err.children) };
    }
    if (constraints.length > 0) {
      return { ...acc, [key]: constraints[0] };
    }
    return { ...acc, [key]: 'invalid' };
  }, {});

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

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      whitelist: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException({
          message: VALIDATION_ERROR,
          data: { errorList: buildErrorList(errors) },
        }),
    }),
  );

  await app.listen(PORT, () => Logger.log(`Server started on port = ${PORT}`));
}
start();
