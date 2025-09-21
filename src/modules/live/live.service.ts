import { Live } from './live.entity';
import { Repository } from 'typeorm';
import { YoutubeIntegrationService } from './external/youtube.integration.service';
import { AppDataSource } from '../../database/data-source';
import { EventEmitter } from 'events';
import { CreateWatchLiveDto } from './live.dto';
import { parse } from 'date-fns';

export class LiveService extends EventEmitter {
  private liveRepository: Repository<Live>;
  private youtubeService: YoutubeIntegrationService;

  constructor() {
    super()
    this.liveRepository = AppDataSource.getRepository(Live);
    this.youtubeService = new YoutubeIntegrationService();
  }

  async getAll(): Promise<Live[]> {
    return this.liveRepository.find();
  }

  async getById(id: number): Promise<Live | null> {
    return this.liveRepository.findOne({ where: { id } });
  }

  async create(liveData: CreateWatchLiveDto): Promise<Live> {
    const videoId = this.extractYoutubeVideoId(liveData.videoUrl)
    if (!videoId) {
      throw Error("Video URL is not valid... please provide in format: https://www.youtube.com/watch?v=VIDEO_ID, https://youtu.be/VIDEO_ID, https://www.youtube.com/embed/VIDEO_ID")
    }
    if (liveData.isLive) {
      const existingLive = await this.liveRepository.findOne({ where: { isLive: true } });
      if (existingLive) {
        existingLive.isLive = false;
        await this.liveRepository.save(existingLive);
      }
    }
    if (liveData.featured) {
      const existingFeatured = await this.liveRepository.findOne({ where: { featured: true } });
      if (existingFeatured) {
        existingFeatured.featured = false;
        await this.liveRepository.save(existingFeatured);
      }
    }
    const live = this.liveRepository.create(liveData);
    live.isLive = live.isLive ?? false;
    const saved = this.liveRepository.save(live);
    this.emit('liveUpdated', saved);
    return saved;
  }

  async getLastestLive(): Promise<Live> {
    const latestLive = await this.liveRepository
      .createQueryBuilder("live")
      .orderBy("date", "DESC")
      .getOne();
    if (!latestLive) throw Error("Cannot find live")
    return latestLive
  }

  async update(id: number, liveData: Partial<Live>): Promise<Live | null> {
    const live = await this.liveRepository.findOne({ where: { id } });
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
    const liveEvent = await this.liveRepository.findOne({ where: { isLive: true } });
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
      const existing = await this.liveRepository.findOne({ where: { isLive: true } });
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
      const existing = await this.liveRepository.findOne({ where: { isLive: true } });
      if (existing) {
        existing.isLive = false;
        await this.liveRepository.save(existing);
      }
      return null;
    }
  }
}
