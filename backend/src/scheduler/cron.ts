import cron from 'node-cron';
import { dailyDeliveryJob } from '../jobs/daily-delivery.job';

export const initScheduler = () => {
  console.log('⏰ Initializing CRON Scheduler...');

  // Run every day at 3:50 PM Asia/Kolkata timezone
  cron.schedule('50 15 * * *', () => {
    console.log('⏰ Triggering daily delivery job...');
    dailyDeliveryJob();
  }, {
    timezone: "Asia/Kolkata"
  });
};
