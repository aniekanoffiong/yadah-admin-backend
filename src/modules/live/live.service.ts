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
}
