import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service';
import { sendSuccess } from '../utils/response';

export const adminController = {
  async getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getDashboardStats();
      sendSuccess(res, stats, 'Admin dashboard stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};
