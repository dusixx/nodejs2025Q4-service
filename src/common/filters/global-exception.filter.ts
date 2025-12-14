import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { customLoggingSrvice } from '../logging/logging.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, originalUrl: url, query, params } = request;

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    const timestamp = Date.now();

    const errorDetails = {
      method,
      url,
      statusCode: status,
      message: exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined,
      timestamp,
      body: JSON.stringify(request.body),
      query,
      params,
    };
    if (status >= 500) {
      customLoggingSrvice.error(
        `Exception: (${status}) ${method} ${url} ${message}`,
        JSON.stringify(errorDetails),
        'GlobalExceptionFilter',
      );
    }
    response.status(status).json({
      statusCode: status,
      timestamp,
      path: url,
      message,
    });
  }
}
