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
    return this.aboutRepo.findOne({ relations: ['story', 'story.stats', 'values', 'values.items'] });
  }

  async create(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  async update(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  async deleteStoryStatsByStoryId(storyId: number): Promise<void> {
    await this.storyStatRepo.delete({ story: { id: storyId } });
  }

  async deleteValueItemsByValuesId(valuesId: number): Promise<void> {
    await this.valueItemRepo.delete({ values: { id: valuesId } });
  }
}
