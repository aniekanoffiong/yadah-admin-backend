import { Live } from './live.entity';
import { Repository } from 'typeorm';
import { YoutubeIntegrationService } from './external/youtube.integration.service';
import { AppDataSource } from '../../database/data-source';
import { EventService } from '../event/event.service';
import { ScheduledProgramService } from '../scheduledPrograms/scheduledProgram.service';
import { EventEmitter } from 'events';

export class LiveService extends EventEmitter {
  private liveRepository: Repository<Live>;
  private youtubeService: YoutubeIntegrationService;
  private eventService: EventService;
  private scheduledProgramService: ScheduledProgramService;

  constructor() {
    super()
    this.liveRepository = AppDataSource.getRepository(Live);
    this.youtubeService = new YoutubeIntegrationService();
    this.eventService = new EventService()
    this.scheduledProgramService = new ScheduledProgramService()
  }

  async getAll(): Promise<Live[]> {
    return this.liveRepository.find();
  }

  async getById(id: number): Promise<Live | null> {
    return this.liveRepository.findOne({ where: { id } });
  }

  async create(liveData: Partial<Live>): Promise<Live> {
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
    if (liveEvent.startTime && liveEvent.endTime) {
      if (now >= liveEvent.startTime && now <= liveEvent.endTime) {
        return liveEvent;
      }
    }

    return null;
  }

  async pollLiveEvent(): Promise<Live | null> {
    const currentLive = await this.youtubeService.checkLiveStream();

    if (currentLive) {
      const existing = await this.liveRepository.findOne({ where: { isLive: true } });
      if (existing && existing.videoId === currentLive.videoId) {
        existing.videoId = currentLive.videoId;
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
