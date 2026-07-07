import cron from 'node-cron';
import { dailyDeliveryJob } from '../jobs/daily-delivery.job';

export const initScheduler = () => {
  console.log('⏰ Initializing CRON Scheduler...');

  // Run every day at 12:05 PM Asia/Kolkata timezone
  cron.schedule('5 12 * * *', () => {
    console.log('⏰ Triggering daily delivery job...');
    dailyDeliveryJob();
  }, {
    timezone: "Asia/Kolkata"
  });

  // Retries (Optional extension):
  // You can set up another cron that runs every 5 minutes and looks for 
  // Deliveries with status = 'FAILED' and retries < 3. 
  // For now, we focus on the main daily delivery job.
};
