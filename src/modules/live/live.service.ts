import { Live } from './live.entity';
import { YoutubeIntegrationService } from './external/youtube-integration.service';
import { EventEmitter } from 'events';
import { CreateWatchLiveDto } from './live.dto';
import { parse } from 'date-fns';
import { LiveRepository } from './live.repository';

export class LiveService extends EventEmitter {
  private liveRepository: LiveRepository;
  private youtubeService: YoutubeIntegrationService;

  constructor() {
    super()
    this.liveRepository = new LiveRepository;
    this.youtubeService = new YoutubeIntegrationService();
  }

  async getAll(): Promise<Live[]> {
    return this.liveRepository.findAll();
  }

  async getById(id: number): Promise<Live | null> {
    return this.liveRepository.findOne(id);
  }

  async findRecent(limit: number): Promise<Live[]> {
    return this.liveRepository.findRecent(limit);
  }

  async findFeatured(): Promise<Live | null> {
    return this.liveRepository.latestLive();
  }

  async create(liveData: CreateWatchLiveDto): Promise<Live> {
    const videoId = this.extractYoutubeVideoId(liveData.videoUrl)
    if (!videoId) {
      throw Error("Video URL is not valid... please provide in format: https://www.youtube.com/watch?v=VIDEO_ID, https://youtu.be/VIDEO_ID, https://www.youtube.com/embed/VIDEO_ID")
    }
    if (liveData.isLive) {
      const existingLive = await this.liveRepository.latestLive();
      if (existingLive) {
        existingLive.isLive = false;
        await this.liveRepository.save(existingLive);
      }
    }
    if (liveData.featured) {
      const existingFeatured = await this.liveRepository.featuredLive();
      if (existingFeatured) {
        existingFeatured.featured = false;
        await this.liveRepository.save(existingFeatured);
      }
    }
    const live = new Live()
    
    live.isLive = liveData.isLive ?? false;
    const saved = this.liveRepository.save(live);
    this.emit('liveUpdated', saved);
    return saved;
  }

  async getLastestLive(): Promise<Live> {
    return this.liveRepository.latestLive()
  }

  async update(id: number, liveData: Partial<Live>): Promise<Live | null> {
    const live = await this.liveRepository.findOne(id);
    if (!live) return null;

    Object.assign(live, liveData);
    const updated = this.liveRepository.save(live);
    this.emit('liveUpdated', updated);
    return updated
  }

  async delete(id: number): Promise<void> {
    const result = await this.liveRepository.delete(id);
  }

  async getCachedLiveEvent(): Promise<Live | null> {
    const liveEvent = await this.liveRepository.latestLive();
    if (!liveEvent) return null;

    const now = new Date();
    const startTime = liveEvent.startTime ? parse(liveEvent.startTime, "HH:mm", liveEvent.date) : null;
    const endTime = liveEvent.endTime ? parse(liveEvent.endTime, "HH:mm", liveEvent.date) : null;
    if (startTime && endTime) {
      if (now >= startTime && now <= endTime) {
        return liveEvent;
      }
    }

    return null;
  }

  // Add this method to reconcile previously-live videos
  async reconcileEndedLiveBroadcasts(): Promise<void> {
    try {
      const activeLives = await this.liveRepository.findActiveLives();
      if (!activeLives || activeLives.length === 0) return;

      // Map videoId => Live
      const idToLive = new Map<string, Live>();
      for (const l of activeLives) {
        const vid = this.extractYoutubeVideoId(l.videoUrl || '');
        if (vid) idToLive.set(vid, l);
      }

      const ids = Array.from(idToLive.keys());
      if (ids.length === 0) return;

      const toUpdateList = await this.youtubeService.processPreviousLive(ids, idToLive)
      // For any ids not returned by videos.list, consider they might be deleted/unavailable.
      // You can decide to mark them not live after some grace period.
      if (toUpdateList.length > 0) {
        const nowTime = new Date()
        // only mark live as ended after 10 minutes
        const toUpdateFinal = toUpdateList.filter(item => parse(item.startTime, "HH:mm", item.date).getTime() - nowTime.getTime() > 10 * 1000 * 60)
        await this.liveRepository.saveMany(toUpdateFinal);
        console.log(`Reconciled ${toUpdateFinal.length} ended live(s) out of total ${toUpdateList.length}`);
      }
    } catch (err) {
      console.error('Error reconciling ended lives:', err);
    }
  }

  async checkLiveStream() {
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

  extractYoutubeVideoId(url: string): string | null {
    // Standard: https://www.youtube.com/watch?v=VIDEO_ID
    // Short: https://youtu.be/VIDEO_ID
    // Embed: https://www.youtube.com/embed/VIDEO_ID
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async pollLiveEvent(): Promise<Live | null> {
    const currentLive = await this.youtubeService.checkLiveStream();

    if (currentLive) {
      const existing = await this.liveRepository.latestLive();
      if (existing && existing.videoUrl === currentLive.videoUrl) {
        existing.videoUrl = currentLive.videoUrl;
        existing.title = currentLive.title;
        existing.startTime = currentLive.startTime;
        existing.endTime = currentLive.endTime;
        existing.isLive = true;
        await this.liveRepository.save(existing);
        return existing;
      } else {
        await this.liveRepository.save(currentLive);
        return currentLive;
      }
    } else {
      const existing = await this.liveRepository.latestLive();
      if (existing) {
        existing.isLive = false;
        await this.liveRepository.save(existing);
      }
      return null;
    }
  }

  async executeVideosImport(params?: {
    filterLive?: boolean,
    startDate?: Date,
    endDate?: Date
  }) {
    const startTime = Date.now();
    let totalImported = 0;
    let totalErrors = 0;

    try {
      await this.youtubeService.getAllHistoricVideos({
        maxResults: 50, // Fetch 50 at a time (max allowed by YouTube API)
        publishedAfter: params?.startDate,
        
        // Process each batch as it comes in
        onBatch: async (videos: Live[]) => {
          console.log(`\n📦 Processing batch of ${videos.length} videos...`);
          
          for (const video of videos) {
            try {
              // Save to database
              await this.saveVideoToDatabase(video);
              totalImported++;
              
              // Log progress
              if (totalImported % 10 === 0) {
                console.log(`✅ Imported ${totalImported} videos so far...`);
              }
            } catch (error) {
              console.error(`❌ Error saving video "${video.title}":`, error);
              totalErrors++;
            }
          }
          
          console.log(`Batch complete. Total imported: ${totalImported}, Errors: ${totalErrors}`);
        },
      });

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      console.log('\n========================================');
      console.log('Import Complete!');
      console.log('========================================');
      console.log(`✅ Total videos imported: ${totalImported}`);
      console.log(`❌ Total errors: ${totalErrors}`);
      console.log(`⏱️  Time taken: ${duration} seconds`);
      console.log(`📊 Success rate: ${((totalImported / (totalImported + totalErrors)) * 100).toFixed(2)}%`);

    } catch (error) {
      console.error('Fatal error during import:', error);
      throw error;
    }
  }

  /**
   * Clear the service cache
   */
  clearCache(): void {
    this.youtubeService.clearCache();
  }

  /**
   * Save video to database
   * Replace this with your actual database logic
   */
  private async saveVideoToDatabase(video: Live): Promise<void> {
    await this.liveRepository.save(video);
    console.log(`💾 Successfully saved video: ${video.title}`);    
  }
}
