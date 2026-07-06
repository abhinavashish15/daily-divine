import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminService {
  async getDashboardStats() {
    // 1. Calculate Total Revenue from APPROVED payments
    const payments = await prisma.payment.findMany({
      where: { status: 'APPROVED' },
      select: { amount: true },
    });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // 2. Fetch all users and their subscriptions
    const users = await prisma.user.findMany({
      include: {
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get latest subscription
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Format user data (calculate days left)
    const formattedUsers = users.map((user) => {
      const activeSub = user.subscriptions[0];
      let daysLeft = 0;
      
      if (activeSub && activeSub.status === 'ACTIVE' && activeSub.renewalDate) {
        const now = new Date();
        const renewal = new Date(activeSub.renewalDate);
        if (renewal > now) {
          const diffTime = Math.abs(renewal.getTime() - now.getTime());
          daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        }
      }

      return {
        id: user.id,
        name: user.name || 'Anonymous',
        email: user.email,
        phone: user.phone || 'N/A',
        role: user.role,
        plan: activeSub?.plan || 'FREE',
        daysLeft,
      };
    });

    return {
      totalRevenue,
      totalUsers: users.length,
      users: formattedUsers,
    };
  }
}

export const adminService = new AdminService();
