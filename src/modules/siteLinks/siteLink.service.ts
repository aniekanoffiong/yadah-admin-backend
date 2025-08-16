import { SiteLinkRepository } from './siteLink.repository';
import { SiteLink } from './siteLink.entity';
import { CreateSiteLinkDto } from './siteLink.dto';

export class SiteLinkService {
  private siteLinkRepository: SiteLinkRepository;

  constructor(siteLinkRepository?: SiteLinkRepository) {
    this.siteLinkRepository = siteLinkRepository || new SiteLinkRepository();
  }

  async findAll(): Promise<SiteLink[]> {
    return this.siteLinkRepository.findAll();
  }

  async findOne(id: number): Promise<SiteLink> {
    const siteLink = await this.siteLinkRepository.findOne(id);
    if (!siteLink) throw new Error(`SiteLink with id ${id} not found`);
    return siteLink;
  }

  async create(dto: CreateSiteLinkDto): Promise<SiteLink> {
    const siteLink = new SiteLink();
    siteLink.label = dto.label;
    siteLink.url = dto.url;

    return this.siteLinkRepository.create(siteLink);
  }

  async getOrCreateSiteLinks(siteLinks?: CreateSiteLinkDto[]): Promise<SiteLink[]> {
    if (!siteLinks || siteLinks.length === 0) {
      return [];
    }
    const existingLinks = await this.siteLinkRepository.findAll();
    const existingUrls = new Set(existingLinks.map(link => link.url));

    const newLinks: SiteLink[] = [];
    for (const dto of siteLinks) {
      if (!existingUrls.has(dto.url)) {
        const newLink = await this.create(dto);
        newLinks.push(newLink);
      }
    }
    return [...existingLinks, ...newLinks];
  }

  async update(id: number, dto: CreateSiteLinkDto): Promise<SiteLink> {
    const siteLink = await this.findOne(id);
    siteLink.label = dto.label;
    siteLink.url = dto.url;

    return this.siteLinkRepository.update(siteLink);
  }

  async delete(id: number): Promise<void> {
    await this.siteLinkRepository.delete(id);
  }
}
