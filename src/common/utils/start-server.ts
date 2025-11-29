/* eslint-disable @typescript-eslint/no-misused-promises */
import { INestApplication } from '@nestjs/common';
import * as net from 'net';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { sleep } from '.';
import { cyan, red } from './style';

const execAsync = promisify(exec);

async function isPortAvailable(port: number | string): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

const tryKillTask = async (pid: string | number): Promise<void> => {
  try {
    await execAsync(`taskkill /f /pid ${pid}`);
  } catch {
    void 0;
  }
};

const tryKillServer = async (port: number | string): Promise<void> => {
  try {
    if (process.platform === 'win32') {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      const matches = stdout.match(/\d+$/gm) ?? [];
      const pids = [...new Set(matches)].map(Number).filter(Boolean);

      for (const pid of pids) {
        await tryKillTask(pid);
      }
    } else {
      await execAsync(`lsof -ti:${port} | xargs kill -9`);
    }
  } catch {
    void 0;
  }
};

type TryFreePortProps = {
  port: number | string;
  attempts?: number;
  delay?: number;
  quiet?: boolean;
};

class TimeoutError extends Error {}

const tryFreePort = async ({
  port,
  attempts = 5,
  delay = 1500,
  quiet,
}: TryFreePortProps): Promise<void> => {
  let curAttempt = 0;

  while (!(await isPortAvailable(port))) {
    if (!quiet) {
      console.log(`Address in use, retrying (${curAttempt + 1}/${attempts})...`);
    }
    await tryKillServer(port);
    await sleep(delay);

    if ((curAttempt += 1) >= attempts) {
      throw new TimeoutError('time is up');
    }
  }
};

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
      console.log(red('\nError:'), 'time is up');
      return;
    }
    throw err;
  }
};
