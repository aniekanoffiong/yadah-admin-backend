import { StatisticsRepository } from './statistics.repository';
import { CreateStatisticsDto, CreateStatItemDto, UpdateStatItemDto } from './statistics.dto';
import { Statistics, StatItem } from './statistics.entity';

export class StatisticsService {
  private statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository?: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository || new StatisticsRepository();
  }

  async find(): Promise<Statistics> {
    const statistics = await this.statisticsRepository.find();
    if (!statistics) throw new Error('Statistics not found');
    return statistics;
  }

  async update(dto: CreateStatisticsDto): Promise<Statistics> {
    const statistics = await this.find();
    statistics.backgroundImage = dto.backgroundImage;

    statistics.statItems = await Promise.all(dto.statItems.map(async (itemDto) => {
      if (itemDto.id) {
        const item = await this.findStatItem(itemDto.id)
        item.number = itemDto.number;
        item.label = itemDto.label;
        item.icon = itemDto.icon;
        return item;
      } else {
        const item = new StatItem();
        item.statisticsId = itemDto.statisticsId!;
        item.number = itemDto.number;
        item.label = itemDto.label;
        item.icon = itemDto.icon;
        return item;
      }
    }));

    return this.statisticsRepository.update(statistics);
  }

  // Stat Items
  async findAllStatItems(): Promise<StatItem[]> {
    return this.statisticsRepository.findAllStatItems();
  }

  async findStatItem(id: number): Promise<StatItem> {
    const statItem = await this.statisticsRepository.findStatItem(id);
    if (!statItem) throw new Error("Stat Item not found")
    return statItem
  }

  async createStatItem(dto: CreateStatItemDto): Promise<StatItem> {
    const item = new StatItem();
    item.statisticsId = dto.parentEntityId!;
    item.number = dto.number;
    item.label = dto.label;
    item.icon = dto.icon;

    return this.statisticsRepository.createStatItem(item);
  }

  async updateStatItem(id: number, dto: UpdateStatItemDto): Promise<StatItem> {
    await this.find();
    const storyItem = await this.statisticsRepository.findStatItem(id);
    if (!storyItem) throw Error(`StatItem with id ${id} not found`);
    storyItem.number = dto.number;
    storyItem.label = dto.label;
    storyItem.icon = dto.icon;

    return this.statisticsRepository.updateStatItem(storyItem);
  }

  async deleteStatItem(id: number): Promise<void> {
    await this.statisticsRepository.deleteStatItem(id);
  }
}
