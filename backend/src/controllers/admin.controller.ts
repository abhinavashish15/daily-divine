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

  async broadcastMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { text, imageId } = req.body;
      if (!text && !imageId) {
        return res.status(400).json({ success: false, message: 'Text or imageId is required' });
      }

      const result = await adminService.broadcastMessage(text, imageId);
      sendSuccess(res, result, 'Broadcast processing finished');
    } catch (error) {
      next(error);
    }
  },
};
