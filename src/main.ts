import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { AppModule } from './app.module';
import { DEF_PORT } from './common/constants';

const VERSION = '1.0.0';
const TITLE = 'Home Library Service';
const API_YAML_PATH = './doc/api.yaml';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription([...TITLE].reverse().join('') + ' :)')
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  writeFileSync(API_YAML_PATH, yaml.dump(document));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(configService.get<string>('PORT') || DEF_PORT);
}
void bootstrap();
