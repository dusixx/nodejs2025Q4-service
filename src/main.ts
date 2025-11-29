import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEF_PORT } from './common/constants';
import { startNestServer, updateYAMLDoc } from './main.utils';

const VERSION = '1.0.0';
const TITLE = 'Home Library Service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || DEF_PORT;

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription([...TITLE].reverse().join(''))
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

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
