import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { envVar } from '../config/env';

type LogLevelNum = (typeof LogLevel)[keyof typeof LogLevel];
type LogType = 'errors' | 'app';

export const LogLevel = {
  Error: 0,
  Warn: 1,
  Log: 2,
  Debug: 3,
  Verbose: 4,
} as const;

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  private readonly logDir: string;
  private readonly maxSize: number;
  private readonly maxFiles: number;

  private currentLevel: LogLevelNum;
  private currentAppFile: string | null = null;
  private currentErrorsFile: string | null = null;

  constructor() {
    super(CustomLogger.name);

    this.maxFiles = envVar.LOG_MAX_FILES;
    this.logDir = path.join(process.cwd(), envVar.LOG_DIR);
    this.maxSize = envVar.LOG_MAX_SIZE_KB * 1024;
    this.currentLevel = envVar.LOG_LEVEL as LogLevelNum;

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    this.removeOldFiles();
  }

  private shouldLog(level: LogLevelNum): boolean {
    return level <= this.currentLevel;
  }

  public error(message: unknown, trace?: string, context?: string): void {
    if (this.shouldLog(LogLevel.Error)) {
      const formatted = this.formatMsg(message, context, 'Error');
      super.error(formatted);
      this.writeToFile('errors', formatted);
      if (trace) {
        this.writeToFile('errors', `[Trace] ${trace}`);
      }
    }
  }

  public warn(message: unknown, context?: string): void {
    if (this.shouldLog(LogLevel.Warn)) {
      const formatted = this.formatMsg(message, context, 'Warn');
      super.warn(formatted);
      this.writeToFile('app', formatted);
    }
  }

  public log(message: unknown, context?: string): void {
    if (this.shouldLog(LogLevel.Log)) {
      const formatted = this.formatMsg(message, context, 'Log');
      super.log(formatted);
      this.writeToFile('app', formatted);
    }
  }

  public debug(message: unknown, context?: string): void {
    if (this.shouldLog(LogLevel.Debug)) {
      const formatted = this.formatMsg(message, context, 'Debug');
      super.debug(formatted);
      this.writeToFile('app', formatted);
    }
  }

  public verbose(message: unknown, context?: string): void {
    if (this.shouldLog(LogLevel.Verbose)) {
      const formatted = this.formatMsg(message, context, 'Verbose');
      super.verbose(formatted);
      this.writeToFile('app', formatted);
    }
  }

  private formatMsg(message: unknown, context?: string, level?: keyof typeof LogLevel): string {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const ctx = context || this.context || 'Application';
    return `${timestamp} [${level || 'Log'}] [${ctx}] ${String(message)}`;
  }

  private writeToFile(type: LogType, message: string): void {
    try {
      const currentFile = this.getCurrentFile(type);
      if (!currentFile) {
        return;
      }
      this.createNewFileIfNecessary(type, currentFile);
      fs.appendFileSync(currentFile, message + '\n', 'utf8');

      this.trimFiles(type);
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  private getCurrentFile(type: LogType): string | null {
    try {
      const currentFile = type === 'app' ? this.currentAppFile : this.currentErrorsFile;
      if (currentFile && fs.existsSync(currentFile)) {
        return currentFile;
      }
      const date = new Date().toISOString().split('T')[0];
      const timestamp = Date.now();
      const fileName = `${type}-${date}-${timestamp}.log`;
      const filePath = path.join(this.logDir, fileName);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
      }
      if (type === 'app') {
        this.currentAppFile = filePath;
      } else {
        this.currentErrorsFile = filePath;
      }

      return filePath;
    } catch (error) {
      console.error(`Failed to get current ${type} file:`, error);
      return null;
    }
  }

  private createNewFileIfNecessary(type: LogType, currentFilePath: string): void {
    try {
      if (fs.existsSync(currentFilePath)) {
        const stats = fs.statSync(currentFilePath);
        if (stats.size >= this.maxSize) {
          const date = new Date().toISOString().split('T')[0];
          const timestamp = Date.now();
          const newFileName = `${type}-${date}-${timestamp}.log`;
          const newFilePath = path.join(this.logDir, newFileName);

          fs.writeFileSync(newFilePath, '', 'utf8');

          if (type === 'app') {
            this.currentAppFile = newFilePath;
          } else {
            this.currentErrorsFile = newFilePath;
          }
        }
      }
    } catch (error) {
      console.error(` ${type}: failed to create`, error);
    }
  }

  private trimFiles(type: LogType): void {
    try {
      const files = fs
        .readdirSync(this.logDir)
        .filter(f => f.startsWith(`${type}-`))
        .map(f => {
          const filePath = path.join(this.logDir, f);
          const stats = fs.statSync(filePath);
          return {
            name: f,
            path: filePath,
            created: stats.birthtimeMs,
            modified: stats.mtimeMs,
          };
        })
        .sort((a, b) => b.modified - a.modified);

      if (files.length > this.maxFiles) {
        const filesToDelete = files.slice(this.maxFiles);
        for (const file of filesToDelete) {
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            console.error(`Failed to delete ${file.name}`, err);
          }
        }
      }
    } catch (error) {
      console.error(`${type}: failed to trim`, error);
    }
  }

  private removeOldFiles(): void {
    try {
      this.trimFiles('app');
      this.trimFiles('errors');
    } catch (error) {
      console.error('Failed to remove:', error);
    }
  }
}

export const customLogger = new CustomLogger();
