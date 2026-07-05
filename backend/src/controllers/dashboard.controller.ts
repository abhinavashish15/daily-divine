import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboard.service';
import { sendSuccess } from '../utils/response';

export const dashboardController = {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getDashboardStats();
      sendSuccess(res, data, 'Dashboard stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};
