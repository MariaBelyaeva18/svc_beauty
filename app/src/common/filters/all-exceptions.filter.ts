import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { STATUS_CODES } from 'node:http';

type ErrorBody = {
  statusCode: number;
  error: string;
  message: string;
  data?: unknown;
  path?: string;
  timestamp?: string;
};

const normalizeMessage = (value: unknown): string => {
  if (Array.isArray(value)) return value.join('; ');
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultError = STATUS_CODES[statusCode] ?? 'Error';

    const exceptionResponse = isHttpException ? exception.getResponse() : undefined;
    const responseObj =
      exceptionResponse && typeof exceptionResponse === 'object'
        ? (exceptionResponse as any)
        : undefined;

    const body: ErrorBody = {
      statusCode,
      error: normalizeMessage(responseObj?.error ?? defaultError),
      message: normalizeMessage(
        responseObj?.message ?? (isHttpException ? exception.message : defaultError),
      ),
      ...(responseObj?.data !== undefined ? { data: responseObj.data } : {}),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(body);
  }
}
