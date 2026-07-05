import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(res: Response, data?: T, message: string = 'Success', statusCode: number = 200) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, message: string = 'Error', statusCode: number = 500, errors?: any[]) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};
