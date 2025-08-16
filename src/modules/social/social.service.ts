import { SocialLinkRepository } from './social.repository';
import { SocialLink } from './social.entity';
import { CreateSocialDto } from './social.dto';

export class SocialLinkService {
  private socialLinkRepository: SocialLinkRepository;

  constructor(socialLinkRepository?: SocialLinkRepository) {
    this.socialLinkRepository = socialLinkRepository || new SocialLinkRepository();
  }

  async findAll(): Promise<SocialLink[]> {
    return this.socialLinkRepository.findAll();
  }

  async findOne(id: number): Promise<SocialLink> {
    const socialLink = await this.socialLinkRepository.findOne(id);
    if (!socialLink) throw new Error(`SocialLink with id ${id} not found`);
    return socialLink;
  }

  async create(dto: CreateSocialDto): Promise<SocialLink> {
    const socialLink = new SocialLink();
    socialLink.platform = dto.platform;
    socialLink.icon = dto.icon;
    socialLink.name = dto.name;
    socialLink.url = dto.url;

    return this.socialLinkRepository.create(socialLink);
  }

  async getOrCreateSocialLinks(socialLinks?: CreateSocialDto[]): Promise<SocialLink[]> {
    if (!socialLinks || socialLinks.length === 0) {
      return [];
    }
    const existingLinks = await this.socialLinkRepository.findAll();
    const existingUrls = new Set(existingLinks.map(link => link.url));

    const newLinks: SocialLink[] = [];
    for (const dto of socialLinks) {
      if (!existingUrls.has(dto.url)) {
        const newLink = await this.create(dto);
        newLinks.push(newLink);
      }
    }
    return [...existingLinks, ...newLinks];
  }

  async update(id: number, dto: CreateSocialDto): Promise<SocialLink> {
    const socialLink = await this.findOne(id);
    socialLink.platform = dto.platform;
    socialLink.icon = dto.icon;
    socialLink.name = dto.name;
    socialLink.url = dto.url;

    return this.socialLinkRepository.update(socialLink);
  }

  async delete(id: number): Promise<void> {
    await this.socialLinkRepository.delete(id);
  }
}
