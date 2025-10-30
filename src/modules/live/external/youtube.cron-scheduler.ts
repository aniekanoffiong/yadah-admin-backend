import cron, { ScheduledTask } from 'node-cron';
import { YoutubeIntegrationService } from './youtube-integration.service';
import { LiveRepository } from '../live.repository';
import EventEmitter from 'events';
import { AppDataSource } from '../../../database/data-source';

export class YoutubeCronScheduler extends EventEmitter {
  private youtubeService: YoutubeIntegrationService;
  private liveRepository: LiveRepository;
  private jobs: ScheduledTask[] = [];

  constructor() {
    super()
    this.youtubeService = new YoutubeIntegrationService();
    this.liveRepository = new LiveRepository();
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
    }, {
      timezone: 'Europe/London' // Adjust to your timezone
    });

    // All other times: Every 15 minutes
    // Note: This will still run during the specific Sunday slot above,
    // but the deduplication in the service will prevent duplicate processing
    const allOthersJob = cron.schedule('*/15 * * * *', async () => {
      console.log('[All Other Times] Checking for live streams...', new Date().toISOString());
      await this.checkAndProcessLiveStream();
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

    try {
      const live = await this.youtubeService.checkLiveStream();

      if (live) {
        console.log('🔴 Live stream detected!');
        console.log(`  Title: ${live.title}`);
        console.log(`  URL: ${live.videoUrl}`);
        console.log(`  Status: ${live.isLive ? 'LIVE NOW' : 'UPCOMING'}`);
        console.log(`  Start Time: ${live.startTime}`);

        // TODO: Process the live stream
        // - Save to database
        // - Send notifications
        // - Update website
        // - Trigger webhooks
        await this.onLiveStreamDetected(live);
      } else {
        console.log('No live or upcoming streams found');
      }

      // Log cache info for monitoring
      const cacheInfo = this.youtubeService.getLastCheckInfo();
      console.log(`Last cached video ID: ${cacheInfo.videoId || 'none'}`);
      console.log(`Last check time: ${cacheInfo.checkTime?.toISOString() || 'never'}`);
      
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

  /**
   * Handle when a live stream is detected
   * Override this method or inject your own handler
   */
  private async onLiveStreamDetected(live: any): Promise<void> {
    // Example: Save to database
    const updatedLive = await this.liveRepository.save(live);

    // Example: Send notification
    this.emit('liveUpdated', updatedLive);
    // await this.notificationService.notifyLiveStream(live);

    // Example: Update website cache
    // await this.cacheService.set('current_live_stream', live);

    console.log('✅ Live stream processed successfully');
  }

  /**
   * Manual trigger for testing
   */
  async triggerManualCheck(): Promise<void> {
    console.log('🔧 Manual check triggered');
    await this.checkAndProcessLiveStream();
  }

  /**
   * Clear the service cache
   */
  clearCache(): void {
    this.youtubeService.clearCache();
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