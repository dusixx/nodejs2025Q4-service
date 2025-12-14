import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { envVar } from './config/env';
import { CustomLoggingService } from './logging/logging.service';
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
  const loggingService = app.get(CustomLoggingService);
  app.useLogger(loggingService);

  // error handling
  app.useGlobalFilters(new GlobalExceptionFilter());
  process.on('unhandledRejection', err => {
    console.log(err);
    loggingService.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });
  process.on('uncaughtException', err => {
    loggingService.error(`Uncaught Exception: ${JSON.stringify(err)}`);
  });
  await startNestServer(app, port);
  updateYAMLDoc(document);
}

void bootstrap();
