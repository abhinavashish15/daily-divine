import { prisma } from '../config/prisma';
import { deliveryService } from '../services/delivery.service';

export const dailyDeliveryJob = async () => {
  console.log('🔄 Starting daily delivery job...');
  
  try {
    // For MVP: Fetch all active users with role USER or ADMIN (basically everyone who is active)
    // In production, we'd filter by subscription status, timezone, preference deliveryTime, etc.
    // For milestone 2, we just run the job for everyone with a phone number.
    
    const users = await prisma.user.findMany({
      where: {
        phone: { not: null },
        receiveAutomatedMessages: true,
      },
    });

    console.log(`Found ${users.length} users to process.`);

    let successCount = 0;
    let failCount = 0;

    for (const user of users) {
      try {
        await deliveryService.processDeliveryForUser(user.id);
        successCount++;
      } catch (error: any) {
        console.error(`Failed to process delivery for user ${user.id}:`, error.message);
        failCount++;
      }
    }

    console.log(`✅ Daily delivery job completed. Success: ${successCount}, Failed: ${failCount}`);
  } catch (error) {
    console.error('❌ Critical error in daily delivery job:', error);
  }
};
