

import { ItemTagRepository } from './itemTag.repository';
import { ItemTag } from './itemTag.entity';
import { CreateItemTagDto } from './itemTag.dto';

export class ItemTagService {
  private itemTagRepository: ItemTagRepository;

  constructor(itemTagRepository?: ItemTagRepository) {
    this.itemTagRepository = itemTagRepository || new ItemTagRepository();
  }

  async findAllTags(): Promise<ItemTag[]> {
    return this.itemTagRepository.findAllTags();
  }

  async findTagById(id: number): Promise<ItemTag> {
    const tag = await this.itemTagRepository.findTagById(id);
    if (!tag) throw new Error(`ItemTag with id ${id} not found`);
    return tag;
  }

  async findTagByLabel(label: string): Promise<ItemTag | null> {
    return await this.itemTagRepository.findTagByLabel(label);
  }

  async createTag(dto: CreateItemTagDto): Promise<ItemTag> {
    const tag = new ItemTag();
    tag.label = dto.label;
    tag.isActive = dto.active ?? false;

    return this.itemTagRepository.createTag(tag);
  }

  async getOrCreateTags(tags: string[] | undefined): Promise<ItemTag[]> {
    return tags ? Promise.all(tags.map(async label => 
      await this.findTagByLabel(label) ||
      await this.createTag({ label, active: true }))
    ) : []
  }

  async updateTag(id: number, dto: CreateItemTagDto): Promise<ItemTag> {
    const tag = await this.findTagById(id);
    tag.label = dto.label;
    tag.isActive = dto.active ?? false;

    return this.itemTagRepository.updateTag(tag);
  }

  async deleteTag(id: number): Promise<void> {
    await this.itemTagRepository.deleteTag(id);
  }
}
