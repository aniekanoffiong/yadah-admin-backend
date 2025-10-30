import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { AppDataSource } from '../../database/data-source';

export class EventRepository {
  private repo: Repository<Event>;

  constructor() {
    this.repo = AppDataSource.getRepository(Event);
  }

  async findAll(): Promise<Event[]> {
    return this.repo.find({ relations: ["tags"] });
  }

  async currentEvent(date: Date): Promise<Event | null> {
    return await this.repo
      .createQueryBuilder("event")
      .andWhere("startDate >= :date", { date })
      .getOne();
  }

  async getUpcomingEvents(limit: number): Promise<Event[]> {
    return this.repo
      .createQueryBuilder('event')
      .orderBy("event.startDate", "DESC")
      .andWhere("event.startDate >= :date", { date: new Date() })
      .limit(limit)
      .getMany();
  }

  async getRecentEvents(limit: number): Promise<Event[]> {
    return this.repo
      .createQueryBuilder('event')
      .orderBy("event.startDate", "DESC")
      .limit(limit)
      .getMany();
  }

  async findOne(id: number): Promise<Event | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(event: Event): Promise<Event> {
    return this.repo.save(event);
  }

  async update(event: Event): Promise<Event> {
    return this.repo.save(event);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
