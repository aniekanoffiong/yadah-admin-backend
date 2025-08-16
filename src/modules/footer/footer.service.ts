import { FooterRepository } from './footer.repository';
import { CreateFooterDto } from './footer.dto';
import { Footer } from './footer.entity';
import { SocialLinkService } from '../social/social.service';
import { SiteLinkService } from '../siteLinks/siteLink.service';

export class FooterService {
  private footerRepository: FooterRepository;
  private socialLinkService: SocialLinkService;
  private siteLinkService: SiteLinkService;

  constructor(
    footerRepository?: FooterRepository,
    socialLinkService?: SocialLinkService,
    siteLinkService?: SiteLinkService
  ) {
    this.footerRepository = footerRepository || new FooterRepository();
    this.socialLinkService = socialLinkService || new SocialLinkService();
    this.siteLinkService = siteLinkService || new SiteLinkService();
  }

  async findAll(): Promise<Footer[]> {
    return this.footerRepository.findAll();
  }

  async findOne(id: number): Promise<Footer> {
    const footer = await this.footerRepository.findOne(id);
    if (!footer) throw new Error(`Footer with id ${id} not found`);
    return footer;
  }

  async create(dto: CreateFooterDto): Promise<Footer> {
    const socialLinks = await this.socialLinkService.getOrCreateSocialLinks(dto.socialLinks);
    const quickLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.quickLinks);
    const ministriesLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.ministries);
    const legalLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.legalLinks);
    const footer = new Footer();
    Object.assign(footer, dto);
    footer.socialLinks = socialLinks;
    footer.quickLinks = quickLinks;
    footer.ministriesLinks = ministriesLinks;
    footer.legalLinks = legalLinks;
    return this.footerRepository.create(footer);
  }

  async update(id: number, dto: CreateFooterDto): Promise<Footer> {
    const socialLinks = await this.socialLinkService.getOrCreateSocialLinks(dto.socialLinks);
    const quickLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.quickLinks);
    const ministriesLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.ministries);
    const legalLinks = await this.siteLinkService.getOrCreateSiteLinks(dto.legalLinks);
    const footer = await this.findOne(id);
    Object.assign(footer, dto);
    footer.socialLinks = socialLinks;
    footer.quickLinks = quickLinks;
    footer.ministriesLinks = ministriesLinks;
    footer.legalLinks = legalLinks;
    return this.footerRepository.update(footer);
  }

  async delete(id: number): Promise<void> {
    await this.footerRepository.delete(id);
  }
}
