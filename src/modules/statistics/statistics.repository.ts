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

  async find(): Promise<Statistics | null> {
    return this.statisticsRepo.findOne({ where: { id: 1 }, relations: ['statItems'] });
  }

  async update(statistics: Statistics): Promise<Statistics> {
    return this.statisticsRepo.save(statistics);
  }

  // StateItem
  async findAllStatItems(): Promise<StatItem[]> {
    return this.statItemRepo.find();
  }

  async findStatItem(id: number): Promise<StatItem | null> {
    return this.statItemRepo.findOne({ where: { id }});
  }

  async createStatItem(statItem: StatItem): Promise<StatItem> {
    return this.statItemRepo.save(statItem);
  }

  async updateStatItem(statItem: StatItem): Promise<StatItem> {
    return this.statItemRepo.save(statItem);
  }

  async deleteStatItem(statItemId: number): Promise<void> {
    await this.statItemRepo.delete({ id: statItemId });
  }
}
