import { prisma } from '../config/prisma';
import { selectImageToSend } from '../utils/imageRotation';
import { AppError } from '../middlewares/error.middleware';
import { Image } from '@prisma/client';

export const rotationService = {
  async getImageForDeity(deity: string): Promise<Image> {
    // Fetch all active images for this deity
    let images = await prisma.image.findMany({
      where: {
        deity,
        active: true,
      },
    });

    if (!images || images.length === 0) {
      console.warn(`No active images found for deity: ${deity}. Falling back to any available active image.`);
      
      // Fallback: fetch any active image from the database
      images = await prisma.image.findMany({
        where: { active: true }
      });
      
      if (!images || images.length === 0) {
        throw new AppError('No active images available in the entire database.', 404);
      }
    }

    const selectedImage = selectImageToSend(images);
    
    if (!selectedImage) {
      throw new AppError(`Failed to select an image for deity: ${deity}`, 500);
    }

    return selectedImage;
  }
};
