import { Request, Response, NextFunction } from 'express';
import { deliveryService } from '../services/delivery.service';
import { sendSuccess } from '../utils/response';

export const deliveryController = {
  async sendTestDelivery(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, deity } = req.body;
      const result = await deliveryService.processDeliveryForUser(userId, deity);
      sendSuccess(res, result, 'Test delivery initiated successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async getDeliveries(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await deliveryService.getDeliveries(page, limit);
      sendSuccess(res, data, 'Deliveries fetched successfully');
    } catch (error) {
      next(error);
    }
  },

  async getDeliveryById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await deliveryService.getDeliveryById(id);
      sendSuccess(res, data, 'Delivery fetched successfully');
    } catch (error) {
      next(error);
    }
  },

  async getUserHistory(req: Request, res: Response, next: NextFunction) {
    try {
      // If user is accessing their own history, we'd use req.user.id
      // If admin, they could pass userId in params/query. Let's assume req.user.id for now.
      const userId = req.user?.id;
      if (!userId) throw new Error('Unauthorized');
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await deliveryService.getUserHistory(userId, page, limit);
      sendSuccess(res, data, 'User history fetched successfully');
    } catch (error) {
      next(error);
    }
  },

  async getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await deliveryService.getDashboardStats();
      sendSuccess(res, data, 'Dashboard stats fetched successfully');
    } catch (error) {
      next(error);
    }
  },
};
