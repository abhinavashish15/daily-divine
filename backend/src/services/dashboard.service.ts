import { userRepository } from '../repositories/user.repository';
import { imageRepository } from '../repositories/image.repository';
import { prisma } from '../config/prisma';

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
  },

  async getUserDashboardStats(userId: string) {
    const [
      subscription,
      preference,
      deliveriesCount,
      recentDeliveries
    ] = await Promise.all([
      prisma.subscription.findFirst({
        where: { userId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.preference.findFirst({
        where: { userId }
      }),
      prisma.delivery.count({
        where: { userId }
      }),
      prisma.delivery.findMany({
        where: { userId },
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: { image: true }
      })
    ]);

    return {
      subscription,
      preference,
      deliveriesCount,
      recentDeliveries
    };
  }
};
