import { FooterRepository } from './footer.repository';
import { CreateFooterDto, FooterResponseDto } from './footer.dto';
import { Footer } from './footer.entity';
import { SocialLinkService } from '../social/social.service';
import { SiteLinkService } from '../siteLinks/siteLink.service';
import { ScheduledProgramService } from '../scheduledPrograms/scheduledProgram.service';
import { ScheduledProgram } from '../scheduledPrograms/scheduledProgram.entity';
import { format, parse } from 'date-fns';
import { SiteLink } from '../siteLinks/siteLink.entity';
import { SiteLinkDto } from '../siteLinks/siteLink.dto';

export class FooterService {
  private footerRepository: FooterRepository;
  private socialLinkService: SocialLinkService;
  private siteLinkService: SiteLinkService;
  private scheduleProgramService: ScheduledProgramService;

  constructor(
    footerRepository?: FooterRepository,
    socialLinkService?: SocialLinkService,
    siteLinkService?: SiteLinkService,
    scheduleProgramService?: ScheduledProgramService,
  ) {
    this.footerRepository = footerRepository || new FooterRepository();
    this.socialLinkService = socialLinkService || new SocialLinkService();
    this.siteLinkService = siteLinkService || new SiteLinkService();
    this.scheduleProgramService = scheduleProgramService || new ScheduledProgramService();
  }

  async find(): Promise<Footer> {
    const footer = await this.footerRepository.findOne();
    if (!footer) throw new Error(`Footer data not found`);
    return footer;
  }

  async getFooter(): Promise<FooterResponseDto> {
    const footer = await this.find()
    const schedule = await this.scheduleProgramService.findAll()
    return this.toDto(footer, schedule)
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
    const footer = await this.find();
    Object.assign(footer, dto);
    footer.socialLinks = socialLinks;
    footer.quickLinks = quickLinks;
    footer.ministriesLinks = ministriesLinks;
    footer.legalLinks = legalLinks;
    return this.footerRepository.update(footer);
  }

  private toDto(footer: Footer, schedules: ScheduledProgram[]): FooterResponseDto {
    return {
      newsletter: {
        title: footer.newsletterTitle,
        subtitle: footer.newsletterSubtitle
      },
      church: {
        logo: { text: footer.logoAlt, icon: footer.logoSrc },
        description: footer.description,
        socialLinks: footer.socialLinks,
      },
      contact: {
        email: footer.email,
        phone: footer.phone,
        address: footer.address,
        schedule: schedules.map(schedule => ({ [schedule.title]: `${schedule.scheduledDay} ${format(parse(schedule.startTime, "HH:mm:ss", new Date()), "h:mm a")}` }))
      },
      socialLinks: footer.socialLinks.map(this.toLinksDto.bind(this)),
      quickLinks: footer.quickLinks.map(this.toLinksDto.bind(this)),
      ministries: footer.ministriesLinks.map(this.toLinksDto.bind(this)),
      legal: footer.legalLinks.map(this.toLinksDto.bind(this)),
      copyright: `© ${new Date().getFullYear()} Church. All rights reserved.`
    }
  }

  private toLinksDto(socialLink: Partial<SiteLink>): SiteLinkDto {
    return {
      id: socialLink.id!,
      label: socialLink.label!,
      url: socialLink.url!,
    };
  }
}
