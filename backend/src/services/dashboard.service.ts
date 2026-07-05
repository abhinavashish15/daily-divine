import { userRepository } from '../repositories/user.repository';
import { imageRepository } from '../repositories/image.repository';

export const dashboardService = {
  async getDashboardStats() {
    const [
      totalUsers,
      totalImages,
      totalActiveImages,
      recentUsers,
      recentImages
    ] = await Promise.all([
      userRepository.count(),
      imageRepository.count(),
      imageRepository.countActive(),
      userRepository.findRecent(5),
      imageRepository.findRecent(5)
    ]);

    return {
      totalUsers,
      totalImages,
      totalActiveImages,
      recentUsers,
      recentUploads: recentImages
    };
  }
};
