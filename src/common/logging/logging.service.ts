import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { envVar } from '../config/env';

export const WinstonLogLevel = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
} as const;

@Injectable()
export class CustomLoggingService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const maxSizeBytes = envVar.LOG_MAX_SIZE_KB * 1024;
    const appLogLevel = String(WinstonLogLevel[envVar.LOG_LEVEL] ?? 'verbose');

    const appTransport = new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: maxSizeBytes,
      maxFiles: '30d',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      level: appLogLevel,
    });

    // separate error log
    const errorTransport = new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: maxSizeBytes,
      maxFiles: '30d',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      level: 'error',
    });

    const nestLevelFilter = winston.format(info => {
      let infoLevel = Number(WinstonLogLevel[info.level]);
      if (Number.isNaN(infoLevel)) {
        infoLevel = envVar.LOG_LEVEL;
      }
      return infoLevel <= envVar.LOG_LEVEL ? info : false;
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        nestLevelFilter(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
              return [
                `[${String(timestamp)}]`,
                `${level}`,
                `${context ? `[${String(context)}]` : ''}:`,
                `${String(message)}`,
                `${trace ? `\n${String(trace)}` : ''}`,
              ].join(' ');
            }),
          ),
        }),
        appTransport,
        errorTransport,
      ],
      exceptionHandlers: [errorTransport],
      exitOnError: false,
    });
  }

  // info -> log
  public log(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  public error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  public warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  public debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  public verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context });
  }
}

export const customLoggingSrvice = new CustomLoggingService();
