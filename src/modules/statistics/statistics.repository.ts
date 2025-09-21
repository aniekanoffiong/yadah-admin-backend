import { Repository } from 'typeorm';
import { Statistics, StatItem } from './statistics.entity';
import { AppDataSource } from '../../database/data-source';

export class StatisticsRepository {
  private statisticsRepo: Repository<Statistics>;
  private statItemRepo: Repository<StatItem>;

  constructor() {
    this.statisticsRepo = AppDataSource.getRepository(Statistics);
    this.statItemRepo = AppDataSource.getRepository(StatItem);
  }

  async findAll(): Promise<Statistics[]> {
    return this.statisticsRepo.find({ relations: ['stats'] });
  }

  async findOne(id: number): Promise<Statistics | null> {
    return this.statisticsRepo.findOne({ where: { id }, relations: ['stats'] });
  }

  async create(statistics: Statistics): Promise<Statistics> {
    return this.statisticsRepo.save(statistics);
  }

  async update(statistics: Statistics): Promise<Statistics> {
    return this.statisticsRepo.save(statistics);
  }

  async delete(id: number): Promise<void> {
    await this.statisticsRepo.delete(id);
  }

  async deleteStatItems(statisticsId: number): Promise<void> {
    await this.statItemRepo.delete({ statistics: { id: statisticsId } });
  }
}
