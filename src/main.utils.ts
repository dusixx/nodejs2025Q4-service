import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { cyan, showError, TimeoutError, tryFreePort, yellow } from './common/utils';

const API_YAML_PATH = './doc/api.yaml';

export const startNestServer = async (
  app: INestApplication,
  port: number | string,
): Promise<void> => {
  console.log();

  try {
    await tryFreePort({ port });
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
