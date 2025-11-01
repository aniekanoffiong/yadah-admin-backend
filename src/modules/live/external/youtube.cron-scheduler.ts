import cron, { ScheduledTask } from 'node-cron';
import EventEmitter from 'events';
import { AppDataSource } from '../../../database/data-source';
import { LiveService } from '../live.service';

export class YoutubeCronScheduler extends EventEmitter {
  private liveService: LiveService;
  private jobs: ScheduledTask[] = [];

  constructor() {
    super()
    this.liveService = new LiveService();
  }

  /**
   * Start all scheduled cron jobs
   */
  start(): void {
    console.log('Starting YouTube live stream polling scheduler...');

    // Sunday 8am-11am: Every 5 minutes
    const sundayMorningJob = cron.schedule('*/5 8-11 * * 0', async () => {
      console.log('[Sunday Morning] Checking for live streams...', new Date().toISOString());
      await this.checkAndProcessLiveStream();
      await this.checkAndProcessEndedLiveStream();
    }, {
      timezone: 'Europe/London' // Adjust to your timezone
    });

    // All other times: Every 15 minutes
    // Note: This will still run during the specific Sunday slot above,
    // but the deduplication in the service will prevent duplicate processing
    const allOthersJob = cron.schedule('*/15 * * * *', async () => {
      console.log('[All Other Times] Checking for live streams...', new Date().toISOString());
      await this.checkAndProcessLiveStream();
      await this.checkAndProcessEndedLiveStream();
    }, {
      timezone: 'Europe/London'
    });

    // Store jobs for potential cleanup
    this.jobs = [
      sundayMorningJob,
      allOthersJob,
    ];

    console.log('✅ All cron jobs scheduled successfully');
    console.log('Schedule:');
    console.log('  - Sunday 8-11am: Every 5 minutes');
    console.log('  - All other times: Every 15 minutes');
  }

  /**
   * Stop all scheduled cron jobs
   */
  stop(): void {
    console.log('Stopping all cron jobs...');
    this.jobs.forEach(job => job.stop());
    this.jobs = [];
    console.log('✅ All cron jobs stopped');
  }

  /**
   * Check for live streams and process the result
   */
  private async checkAndProcessLiveStream(): Promise<void> {
    // Only initialize TypeORM if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    this.liveService.checkLiveStream()
  }

  private async checkAndProcessEndedLiveStream(): Promise<void> {
    // Only initialize TypeORM if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    try {
      await this.liveService.reconcileEndedLiveBroadcasts();
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

  /**
   * Manual trigger for testing
   */
  async triggerManualCheck(): Promise<void> {
    console.log('🔧 Manual check triggered');
    await this.checkAndProcessLiveStream();
    await this.checkAndProcessEndedLiveStream();
  }
}

// Example usage:
// const scheduler = new YoutubeCronScheduler();
// scheduler.start();
//
// To stop:
// scheduler.stop();
//
// For testing:
// await scheduler.triggerManualCheck();