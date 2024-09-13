import { HttpException } from '@nestjs/common';
import { ERRORS } from './errors';

export class ApiError extends HttpException {
  constructor(apiError: keyof typeof ERRORS, message?: string) {
    const error = ERRORS[apiError];
    if (message) {
      error.message = message;
    }
    super(error, error.statusCode);
  }
}
