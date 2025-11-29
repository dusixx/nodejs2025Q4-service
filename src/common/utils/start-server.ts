/* eslint-disable @typescript-eslint/no-misused-promises */
import { INestApplication } from '@nestjs/common';
import * as net from 'net';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { wait } from '.';
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
  timeout?: number;
  delay?: number;
  onRetry?: () => void;
  onTimeout?: () => void;
};

const tryFreePort = async ({
  port,
  timeout = 10_000,
  delay = 1000,
  onRetry,
  onTimeout,
}: TryFreePortProps): Promise<void> => {
  let elapsed = 0;

  while (!(await isPortAvailable(port))) {
    onRetry?.();
    await tryKillServer(port);
    await wait(delay);

    if ((elapsed += delay) >= timeout) {
      onTimeout?.();
    }
  }
};

export const startNestServer = async (
  app: INestApplication,
  port: number | string,
): Promise<void> => {
  await tryFreePort({
    port,
    onRetry: () => {
      console.log('\nAddress in use, retrying...\n');
    },
    onTimeout: () => {
      console.log(red('Error:'), 'time is up');
    },
  });
  await app.listen(port);
  console.log(cyan(`\nServer is running on http://[::1]:${port}\n`));
};
