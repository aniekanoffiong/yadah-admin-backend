import { GalleryRepository } from './gallery.repository';
import { GalleryItem } from './gallery.entity';
import { CreateGalleryItemDto, GalleryItemResponseDto } from './gallery.dto';
import { ItemTagService } from '../itemTag/itemTag.service';
import { HeroService } from '../hero/hero.service';
import { SpecificPage } from '../../utils/enums';
import { HeroResponseDto } from '../hero/hero.dto';

export class GalleryService {
  private galleryRepository: GalleryRepository;
  private itemTagService: ItemTagService;
  private heroService: HeroService;

  constructor(
    galleryRepository?: GalleryRepository,
    itemTagService?: ItemTagService,
    heroService?: HeroService,
  ) {
    this.galleryRepository = galleryRepository || new GalleryRepository();
    this.itemTagService = itemTagService || new ItemTagService()
    this.heroService = heroService || new HeroService()
  }

  async galleryHero(): Promise<HeroResponseDto | null> {
    return this.heroService.findByPage(SpecificPage.GALLERY)
  }

  async findAllItems(): Promise<GalleryItem[]> {
    return this.galleryRepository.findAllItems()
  }

  async galleryItemsForPage(): Promise<GalleryItemResponseDto> {
    const hero = await this.galleryHero()
    const items = await this.galleryRepository.findAllItems()
    return this.toListDto(hero!, items);
  }

  async findRecent(limit: number): Promise<GalleryItemResponseDto> {
    const hero = await this.galleryHero()
    const items = await this.galleryRepository.findRecent(limit)
    return this.toListDto(hero!, items);
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

  private async toListDto(hero: HeroResponseDto, galleryItems: GalleryItem[]): Promise<GalleryItemResponseDto> {
    return {
      title: hero.title,
      subtitle: hero.subtitle!,
      images: galleryItems.map(item => ({
        src: item.src,
        alt: item.alt,
        text: item.caption
      }))
    }
  }
}
