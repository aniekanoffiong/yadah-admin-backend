import { Repository } from 'typeorm';
import { About, StoryStat, ValueItem } from './about.entity';
import { AppDataSource } from '../../database/data-source';

export class AboutRepository {
  private aboutRepo: Repository<About>;
  private storyStatRepo: Repository<StoryStat>;
  private valueItemRepo: Repository<ValueItem>;

  constructor() {
    this.aboutRepo = AppDataSource.getRepository(About);
    this.storyStatRepo = AppDataSource.getRepository(StoryStat);
    this.valueItemRepo = AppDataSource.getRepository(ValueItem);
  }

  async find(): Promise<About | null> {
    return this.aboutRepo.findOne({ where: { id: 1}, relations: ['story', 'story.stats', 'values', 'values.items'] });
  }

  async create(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  async update(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  // StoryStat
  async findAllStoryStats(): Promise<StoryStat[]> {
    return this.storyStatRepo.find();
  }

  async findStoryStat(id: number): Promise<StoryStat | null> {
    return this.storyStatRepo.findOne({ where: { id }});
  }

  async createStoryStat(storyStat: StoryStat): Promise<StoryStat> {
    return this.storyStatRepo.save(storyStat);
  }

  async updateStoryStat(storyStat: StoryStat): Promise<StoryStat> {
    return this.storyStatRepo.save(storyStat);
  }

  async deleteStoryStat(id: number): Promise<void> {
    await this.storyStatRepo.delete(id);
  }

  // ValueItem
  async findAllValueItems(): Promise<ValueItem[]> {
    return this.valueItemRepo.find();
  }

  async findValueItem(id: number): Promise<ValueItem | null> {
    return this.valueItemRepo.findOne({ where: { id }});
  }

  async createValueItem(valueItem: ValueItem): Promise<ValueItem> {
    return this.valueItemRepo.save(valueItem);
  }

  async updateValueItem(valueItem: ValueItem): Promise<ValueItem> {
    return this.valueItemRepo.save(valueItem);
  }

  async deleteValueItem(id: number): Promise<void> {
    await this.valueItemRepo.delete(id);
  }
}
