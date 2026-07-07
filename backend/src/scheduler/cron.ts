import cron from 'node-cron';
import { dailyDeliveryJob } from '../jobs/daily-delivery.job';

export const initScheduler = () => {
  console.log('⏰ Initializing CRON Scheduler...');

  // Run every day at 2:30 PM Asia/Kolkata timezone
  cron.schedule('30 14 * * *', () => {
    console.log('⏰ Triggering daily delivery job...');
    dailyDeliveryJob();
  }, {
    timezone: "Asia/Kolkata"
  });
};
