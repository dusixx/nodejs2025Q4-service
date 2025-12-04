import { exec } from 'node:child_process';
import * as net from 'node:net';
import { promisify } from 'node:util';
import { sleep } from './misc';

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

const tryKillWin32Task = async (pid: string | number): Promise<void> => {
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
        await tryKillWin32Task(pid);
      }
    } else {
      await execAsync(`lsof -ti:${port} | xargs kill -9`);
    }
  } catch {
    void 0;
  }
};

export class TimeoutError extends Error {}

type TryReleasePortProps = {
  port: number | string;
  attempts?: number;
  delay?: number;
  quiet?: boolean;
};

export const tryReleasePort = async ({
  port,
  attempts = 5,
  delay = 1500,
  quiet,
}: TryReleasePortProps): Promise<void> => {
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
