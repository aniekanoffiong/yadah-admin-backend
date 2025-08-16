import { Repository } from 'typeorm';
import { ItemTag } from './itemTag.entity';
import { AppDataSource } from '../../database/data-source';

export class ItemTagRepository {
  private itemTagRepo: Repository<ItemTag>;

  constructor() {
    this.itemTagRepo = AppDataSource.getRepository(ItemTag);
  }

  async findAllTags(): Promise<ItemTag[]> {
    return this.itemTagRepo.find();
  }

  async findTagById(id: number): Promise<ItemTag | null> {
    return this.itemTagRepo.findOne({ where: { id }});
  }

  async findTagByLabel(label: string): Promise<ItemTag | null> {
    return this.itemTagRepo.findOne({ where: { label }});
  }

  async createTag(tag: ItemTag): Promise<ItemTag> {
    return this.itemTagRepo.save(tag);
  }

  async updateTag(tag: ItemTag): Promise<ItemTag> {
    return this.itemTagRepo.save(tag);
  }

  async deleteTag(id: number): Promise<void> {
    await this.itemTagRepo.delete(id);
  }
}
