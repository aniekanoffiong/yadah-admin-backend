import { Repository } from 'typeorm';
import { About, Story, StoryStat, Values, ValueItem } from './about.entity';
import { AppDataSource } from '../../database/data-source';

export class AboutRepository {
  private aboutRepo: Repository<About>;
  private storyRepo: Repository<Story>;
  private storyStatRepo: Repository<StoryStat>;
  private valuesRepo: Repository<Values>;
  private valueItemRepo: Repository<ValueItem>;

  constructor() {
    this.aboutRepo = AppDataSource.getRepository(About);
    this.storyRepo = AppDataSource.getRepository(Story);
    this.storyStatRepo = AppDataSource.getRepository(StoryStat);
    this.valuesRepo = AppDataSource.getRepository(Values);
    this.valueItemRepo = AppDataSource.getRepository(ValueItem);
  }

  async findAll(): Promise<About[]> {
    return this.aboutRepo.find({ relations: ['story', 'story.stats', 'values', 'values.items'] });
  }

  async findOne(id: number): Promise<About | null> {
    return this.aboutRepo.findOne({ where: { id }, relations: ['story', 'story.stats', 'values', 'values.items'] });
  }

  async create(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  async update(about: About): Promise<About> {
    return this.aboutRepo.save(about);
  }

  async delete(id: number): Promise<void> {
    await this.aboutRepo.delete(id);
  }

  async deleteStoryStatsByStoryId(storyId: number): Promise<void> {
    await this.storyStatRepo.delete({ story: { id: storyId } });
  }

  async deleteValueItemsByValuesId(valuesId: number): Promise<void> {
    await this.valueItemRepo.delete({ values: { id: valuesId } });
  }
}
