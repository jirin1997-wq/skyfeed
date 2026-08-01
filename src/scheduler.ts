import cron from 'node-cron';
import { aggregateAllFeeds } from './services/aggregator';

export function initializeScheduler() {
  // Run every 4 hours
  cron.schedule('0 */4 * * *', async () => {
    console.log('📅 Scheduled aggregation triggered');
    await aggregateAllFeeds().catch(console.error);
  });

  // Also run on startup after 5 seconds
  setTimeout(() => {
    console.log('🚀 Initial aggregation on startup');
    aggregateAllFeeds().catch(console.error);
  }, 5000);

  console.log('✅ Scheduler initialized (runs every 4 hours)');
}
