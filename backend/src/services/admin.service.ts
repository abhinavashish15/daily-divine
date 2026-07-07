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

  async broadcastMessage(text?: string, imageId?: string) {
    const { whatsappService } = await import('./whatsapp.service');
    
    let image: any = null;
    if (imageId) {
      image = await prisma.image.findUnique({ where: { id: imageId } });
      if (!image) {
        throw new Error('Selected template image not found');
      }
    }

    // Fetch users who have a phone number
    const users = await prisma.user.findMany({
      where: {
        phone: { not: null }
      }
    });

    let successCount = 0;
    let failCount = 0;

    for (const user of users) {
      try {
        let formattedPhone = user.phone!.replace(/[^0-9]/g, '');
        if (formattedPhone.length === 10) {
          formattedPhone = '91' + formattedPhone;
        }
        formattedPhone = formattedPhone + '@c.us'; // using whatsapp-web.js format!

        if (image) {
          await whatsappService.sendImageMessage(
            formattedPhone, 
            image.imageUrl, 
            image.caption || text || ''
          );
        } else if (text) {
          await whatsappService.sendTextMessage(formattedPhone, text);
        }
        
        successCount++;
      } catch (error: any) {
        console.error(`Failed to send broadcast to ${user.phone}:`, error);
        failCount++;
      }
    }

    return { successCount, failCount, total: users.length };
  }
}

export const adminService = new AdminService();
