import { imageRepository } from '../repositories/image.repository';
import { AppError } from '../middlewares/error.middleware';
import { Prisma } from '@prisma/client';

export const imageService = {
  async getAllImages() {
    return imageRepository.findAll();
  },

  async getImage(id: string) {
    const image = await imageRepository.findById(id);
    if (!image) {
      throw new AppError('Image not found', 404);
    }
    return image;
  },

  async createImage(data: Prisma.ImageCreateInput) {
    return imageRepository.create(data);
  },

  async updateImage(id: string, data: Prisma.ImageUpdateInput) {
    const image = await imageRepository.findById(id);
    if (!image) {
      throw new AppError('Image not found', 404);
    }
    return imageRepository.update(id, data);
  },

  async deleteImage(id: string) {
    const image = await imageRepository.findById(id);
    if (!image) {
      throw new AppError('Image not found', 404);
    }
    return imageRepository.delete(id);
  }
};
