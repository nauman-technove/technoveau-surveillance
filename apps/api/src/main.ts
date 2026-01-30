/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import helmet from 'helmet';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // Enable CORS only for localhost in development
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4200'
        : undefined,
  });

  // Validation
  app.useGlobalPipes(new ZodValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
