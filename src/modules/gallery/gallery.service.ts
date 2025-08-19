import { GalleryRepository } from './gallery.repository';
import { GalleryItem } from './gallery.entity';
import { CreateGalleryItemDto } from './gallery.dto';
import { ItemTagService } from '../itemTag/itemTag.service';

export class GalleryService {
  private galleryRepository: GalleryRepository;
  private itemTagService: ItemTagService;

  constructor(galleryRepository?: GalleryRepository, itemTagService?: ItemTagService) {
    this.galleryRepository = galleryRepository || new GalleryRepository();
    this.itemTagService = itemTagService || new ItemTagService()
  }

  async findAllItems(): Promise<GalleryItem[]> {
    return this.galleryRepository.findAllItems();
  }

  async findItemById(id: number): Promise<GalleryItem> {
    const item = await this.galleryRepository.findOneItem(id);
    if (!item) throw new Error(`GalleryItem with id ${id} not found`);
    return item;
  }

  async createItem(dto: CreateGalleryItemDto): Promise<GalleryItem> {
    const tags = await this.itemTagService.getOrCreateTags(dto.tags)
    const item = new GalleryItem();
    item.src = dto.src;
    item.alt = dto.alt;
    item.caption = dto.caption;
    item.tags = tags;

    return this.galleryRepository.createItem(item);
  }

  async updateItem(id: number, dto: CreateGalleryItemDto): Promise<GalleryItem> {
    const tags = await this.itemTagService.getOrCreateTags(dto.tags)
    const item = await this.findItemById(id);
    item.src = dto.src;
    item.alt = dto.alt;
    item.caption = dto.caption;
    item.tags = tags
    return this.galleryRepository.updateItem(item);
  }

  async deleteItem(id: number): Promise<void> {
    await this.galleryRepository.deleteItem(id);
  }
}
