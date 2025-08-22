import { ContactInfoRepository } from './contact.repository';
import { CreateContactInfoDto } from './contact.dto';
import { ContactInfo } from './contact.entity';
import { SocialLinkService } from '../social/social.service';

export class ContactInfoService {
  private contactInfoRepository: ContactInfoRepository;
  private socialService: SocialLinkService;

  constructor(contactInfoRepository?: ContactInfoRepository, socialService?: SocialLinkService) {
    this.contactInfoRepository = contactInfoRepository || new ContactInfoRepository();
    this.socialService = socialService || new SocialLinkService();
  }

  async find(): Promise<ContactInfo> {
    const info = await this.contactInfoRepository.find();
    if (!info) throw new Error(`ContactInfo not found`);
    return info;
  }

  async create(dto: CreateContactInfoDto): Promise<ContactInfo> {
    const socialPlatforms = await this.socialService.getOrCreateSocialLinks(dto.socialPlatforms);
    const info = new ContactInfo();
    info.title = dto.title;
    info.subtitle = dto.subtitle;
    info.address = dto.address;
    info.email = dto.email;
    info.phones = dto.phones;
    info.socialPlatforms = socialPlatforms;

    return this.contactInfoRepository.create(info);
  }

  async update(dto: CreateContactInfoDto): Promise<ContactInfo> {
    const socialPlatforms = await this.socialService.getOrCreateSocialLinks(dto.socialPlatforms);
    const info = await this.find();
    info.title = dto.title;
    info.subtitle = dto.subtitle;
    info.address = dto.address;
    info.email = dto.email;
    info.phones = dto.phones;
    info.socialPlatforms = socialPlatforms;

    return this.contactInfoRepository.update(info);
  }

  async delete(id: number): Promise<void> {
    await this.contactInfoRepository.delete(id);
  }
}
