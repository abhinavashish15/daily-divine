import { Request, Response, NextFunction } from 'express';
import { imageService } from '../services/image.service';
import { sendSuccess } from '../utils/response';

export const imageController = {
  async getAllImages(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await imageService.getAllImages();
      sendSuccess(res, data, 'Images retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async createImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await imageService.createImage(req.body);
      sendSuccess(res, data, 'Image created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await imageService.updateImage(req.params.id as string, req.body);
      sendSuccess(res, data, 'Image updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      await imageService.deleteImage(req.params.id as string);
      sendSuccess(res, null, 'Image deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
