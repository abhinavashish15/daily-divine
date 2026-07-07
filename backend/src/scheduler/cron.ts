import cron from 'node-cron';
import { dailyDeliveryJob } from '../jobs/daily-delivery.job';

export const initScheduler = () => {
  console.log('⏰ Initializing CRON Scheduler...');

  // Run every day at 2:35 PM Asia/Kolkata timezone
  cron.schedule('35 15 * * *', () => {
    console.log('⏰ Triggering daily delivery job...');
    dailyDeliveryJob();
  }, {
    timezone: "Asia/Kolkata"
  });
};
