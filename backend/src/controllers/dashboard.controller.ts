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

  async getUserDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const data = await dashboardService.getUserDashboardStats(userId);
      sendSuccess(res, data, 'User dashboard stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};
