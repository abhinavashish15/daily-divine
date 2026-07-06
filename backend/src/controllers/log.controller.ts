import { Request, Response, NextFunction } from 'express';
import { logService } from '../services/log.service';
import { sendSuccess } from '../utils/response';

export const logController = {
  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const logs = await logService.getAllLogs();
      sendSuccess(res, logs, 'System logs retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};
