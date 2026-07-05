import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';
import { MESSAGES } from '../constants';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return sendError(res, MESSAGES.VALIDATION_ERROR, 400, err.issues);
  }

  // Handle expected application errors with status code
  if (err.statusCode) {
    return sendError(res, err.message, err.statusCode);
  }

  // Handle unhandled server errors
  return sendError(res, MESSAGES.SERVER_ERROR, 500);
};

// Custom App Error Class for throwing controlled errors in services
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture stack trace, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
