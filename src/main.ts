import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { envVar } from './common/config/env';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { CustomLogger } from './common/logging/custom-logger.service';
import { startNestServer, updateYAMLDoc } from './main.utils';

const VERSION = '1.0.0';
const TITLE = 'Home Library Service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = envVar.PORT;

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription([...TITLE].reverse().join(''))
    .setVersion(VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const appService = app.get(AppService);
  appService.endpoints = Object.keys(document.paths);
  appService.port = port;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // logger
  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  // error handling
  app.useGlobalFilters(new GlobalExceptionFilter());
  process.on('unhandledRejection', err => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });
  process.on('uncaughtException', err => {
    logger.error(`Uncaught Exception: ${JSON.stringify(err)}`);
  });
  await startNestServer(app, port);
  updateYAMLDoc(document);
}

void bootstrap();
