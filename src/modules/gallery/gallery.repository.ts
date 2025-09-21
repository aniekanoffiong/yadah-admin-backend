import { Repository } from 'typeorm';
import { GalleryItem } from './gallery.entity';
import { AppDataSource } from '../../database/data-source';

export class GalleryRepository {
  private itemRepo: Repository<GalleryItem>;

  constructor() {
    this.itemRepo = AppDataSource.getRepository(GalleryItem);
  }

  async findAllItems(): Promise<GalleryItem[]> {
    return this.itemRepo.find({ relations: ['tags'] });
  }

  async findRecent(limit: number): Promise<GalleryItem[]> {
    return this.itemRepo
      .createQueryBuilder('gallery')
      .orderBy("date", "DESC")
      .limit(limit)
      .getMany();
  }

  async findOneItem(id: number): Promise<GalleryItem | null> {
    return this.itemRepo.findOne({ where: { id }});
  }

  async createItem(item: GalleryItem): Promise<GalleryItem> {
    return this.itemRepo.save(item);
  }

  async updateItem(item: GalleryItem): Promise<GalleryItem> {
    return this.itemRepo.save(item);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepo.delete(id);
  }
}
