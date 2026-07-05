import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { sendSuccess } from '../utils/response';

export const profileController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await profileService.getProfile(req.user!.id);
      sendSuccess(res, data, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await profileService.updateProfile(req.user!.id, req.body);
      sendSuccess(res, data, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      await profileService.deleteProfile(req.user!.id);
      sendSuccess(res, null, 'Account deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
