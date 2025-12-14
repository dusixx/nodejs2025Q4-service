import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLogger } from './custom-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl: url, query } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const queryStr = `<Query: ${JSON.stringify(query)}>`;
      const bodyStr = `<Body: ${JSON.stringify(req.body)}>`;
      const reqStr = `[Request]: ${method} ${url} ${queryStr} ${bodyStr}`;
      const respStr = `[Response]: (${statusCode}) ${method} ${url}`;
      const message = `${reqStr} ${respStr}`;

      if (statusCode >= 500) {
        void this.logger.error(message);
      } else if (statusCode >= 400) {
        void this.logger.warn(message);
      } else {
        void this.logger.log(message);
      }
    });

    next();
  }
}
