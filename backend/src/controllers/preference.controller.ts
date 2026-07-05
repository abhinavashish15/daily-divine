import { Request, Response, NextFunction } from 'express';
import { preferenceService } from '../services/preference.service';
import { sendSuccess } from '../utils/response';

export const preferenceController = {
  async getPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await preferenceService.getPreferences(req.user!.id);
      sendSuccess(res, data, 'Preferences retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async updatePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await preferenceService.updatePreferences(req.user!.id, req.body);
      sendSuccess(res, data, 'Preferences updated successfully');
    } catch (error) {
      next(error);
    }
  },
};
