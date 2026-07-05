import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';
import { ROLES } from '../constants';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized - No user session', 401);
    }

    if (req.user.role !== ROLES.ADMIN) {
      throw new AppError('Forbidden - Admin access required', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
