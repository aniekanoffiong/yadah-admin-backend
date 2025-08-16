import { StatisticsRepository } from './statistics.repository';
import { CreateStatisticsDto } from './statistics.dto';
import { Statistics, StatItem } from './statistics.entity';

export class StatisticsService {
  private statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository?: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository || new StatisticsRepository();
  }

  async findAll(): Promise<Statistics[]> {
    return this.statisticsRepository.findAll();
  }

  async findOne(id: number): Promise<Statistics> {
    const statistics = await this.statisticsRepository.findOne(id);
    if (!statistics) throw new Error(`Statistics with id ${id} not found`);
    return statistics;
  }

  async create(dto: CreateStatisticsDto): Promise<Statistics> {
    const statistics = new Statistics();
    statistics.backgroundImage = dto.backgroundImage;
    statistics.stats = dto.statItems.map(itemDto => {
      const item = new StatItem();
      item.number = itemDto.number;
      item.label = itemDto.label;
      item.icon = itemDto.icon;
      return item;
    });

    return this.statisticsRepository.create(statistics);
  }

  async update(id: number, dto: CreateStatisticsDto): Promise<Statistics> {
    const statistics = await this.findOne(id);
    statistics.backgroundImage = dto.backgroundImage;

    await this.statisticsRepository.deleteStatItems(id);

    statistics.stats = dto.statItems.map(itemDto => {
      const item = new StatItem();
      item.number = itemDto.number;
      item.label = itemDto.label;
      item.icon = itemDto.icon;
      return item;
    });

    return this.statisticsRepository.update(statistics);
  }

  async delete(id: number): Promise<void> {
    await this.statisticsRepository.delete(id);
  }
}
