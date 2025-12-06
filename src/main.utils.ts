import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { cyan, showError, TimeoutError, yellow } from './common/utils';

const API_YAML_PATH = './doc/api.yaml';

export const startNestServer = async (
  app: INestApplication,
  port: number | string,
): Promise<void> => {
  console.log();

  try {
    // await tryReleasePort({ port });
    await app.listen(port);
    console.log(cyan(`\nServer is running on http://[::1]:${port}`));
  } catch (err) {
    if (err instanceof TimeoutError) {
      showError('time is up');
      return;
    }
    throw err;
  }
};

export const updateYAMLDoc = (doc: OpenAPIObject): void => {
  try {
    writeFileSync(API_YAML_PATH, yaml.dump(doc));
    console.log(yellow(API_YAML_PATH, 'successfully updated'));
  } catch (err) {
    showError(err);
  }
};
