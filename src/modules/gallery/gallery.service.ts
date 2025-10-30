import { GalleryRepository } from './gallery.repository';
import { GalleryItem } from './gallery.entity';
import { CreateGalleryItemDto, GalleryItemResponseDto } from './gallery.dto';
import { ItemTagService } from '../itemTag/itemTag.service';
import { HeroService } from '../hero/hero.service';
import { Platform, SpecificPage } from '../../utils/enums';
import { HeroResponseDto } from '../hero/hero.dto';
import { FileStorageService } from '../fileStorage/fileStorage.service';
import { SocialLinkService } from '../social/social.service';
import { SocialLink } from '../social/social.entity';

export class GalleryService {
  private galleryRepository: GalleryRepository;
  private itemTagService: ItemTagService;
  private heroService: HeroService;
  private socialLinkService: SocialLinkService;
  private fileStorageService: FileStorageService;

  constructor(
    galleryRepository?: GalleryRepository,
    itemTagService?: ItemTagService,
    heroService?: HeroService,
    socialLinkService?: SocialLinkService,
    fileStorageService?: FileStorageService,
  ) {
    this.galleryRepository = galleryRepository || new GalleryRepository();
    this.itemTagService = itemTagService || new ItemTagService()
    this.heroService = heroService || new HeroService()
    this.socialLinkService = socialLinkService || new SocialLinkService()
    this.fileStorageService = fileStorageService || new FileStorageService()
  }

  async galleryHero(): Promise<HeroResponseDto | null> {
    return this.heroService.findByPage(SpecificPage.GALLERY)
  }

  async findAllItems(): Promise<GalleryItem[]> {
    return this.galleryRepository.findAllItems()
  }

  async galleryItemsForPage(): Promise<GalleryItem[]> {    
    return this.galleryRepository.findAllItems()
  }

  async findRecent(limit: number): Promise<GalleryItemResponseDto> {
    const hero = await this.galleryHero()
    const items = await this.galleryRepository.findRecent(limit)
    const instagramLink = await this.socialLinkService.findByPlatform(Platform.INSTAGRAM)
    return this.toListDto(hero!, items, instagramLink);
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

  private async toListDto(hero: HeroResponseDto, galleryItems: GalleryItem[], instagramLink: SocialLink | null): Promise<GalleryItemResponseDto> {
    return {
      title: hero.title,
      subtitle: hero.subtitle!,
      instagramLink: instagramLink?.url,
      images: await Promise.all(galleryItems.map(async (item) => ({
        src: await this.fileStorageService.getDownloadUrl(item.src),
        alt: item.alt,
        text: item.caption
      })))
    }
  }
}
