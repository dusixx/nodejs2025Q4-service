import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { DEF_APP_PORT } from './common/constants';
import { CustomLoggingService } from './logging/logging.service';
import { startNestServer, updateYAMLDoc } from './main.utils';

const VERSION = '1.0.0';
const TITLE = 'Home Library Service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || DEF_APP_PORT;

  // logger
  const loggingService = app.get(CustomLoggingService);
  app.useLogger(loggingService);

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
  await startNestServer(app, port);
  updateYAMLDoc(document);
}

void bootstrap();
