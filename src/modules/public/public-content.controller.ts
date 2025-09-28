import { Request, Response, NextFunction } from 'express';
import { HeroService } from '../hero/hero.service';
import { EventService } from '../event/event.service';
import { MinistryService } from '../ministries/ministry.service';
import { SermonService } from '../sermon/sermon.service';
import { GalleryService } from '../gallery/gallery.service';
import { PastorService } from '../pastor/pastor.service';
import { AboutService } from '../about/about.service';
import { FooterService } from '../footer/footer.service';
import { ItemTagService } from '../itemTag/itemTag.service';
import { ContactInfoService } from '../contact/contact.service';
import { ScheduledProgramService } from '../scheduledPrograms/scheduledProgram.service';
import { NextStepService } from '../nextStep/nextStep.service';
import { NextStepVariants } from '../nextStep/nextStep.entity';
import { CallToActionService } from '../cta/cta.service';
import { SpecificPage } from '../../utils/enums';
import { LiveService } from '../live/live.service';
import { SiteConfigResponse } from '../site-config/site-config.interface';
import { SiteConfigService } from '../site-config/site.config.service';
import { ScheduledProgram } from '../scheduledPrograms/scheduledProgram.entity';
import { ScheduledProgramDto } from '../scheduledPrograms/scheduledProgram.dto';
import { format, parse, parseISO } from 'date-fns';
import { Sermon } from '../sermon/sermon.entity';
import { SermonDto } from '../sermon/sermon.dto';
import { StatisticsService } from '../statistics/statistics.service';
import { Statistics, StatItem } from '../statistics/statistics.entity';
import { StatisticsDto, StatItemDto } from '../statistics/statistics.dto';
import { About, Story, StoryStat, ValueItem, Values } from '../about/about.entity';
import { AboutDto, StoryDto, StoryStatDto, ValueItemDto, ValuesDto } from '../about/about.dto';
import { GalleryItem } from '../gallery/gallery.entity';
import { GalleryItemDto } from '../gallery/gallery.dto';
import { ItemTag } from '../itemTag/itemTag.entity';
import { ItemTagDto } from '../itemTag/itemTag.dto';
import { Ministry, MinistryActivity } from '../ministries/ministry.entity';
import { MinistryActivityDto, MinistryDto } from '../ministries/ministry.dto';
import { Pastor } from '../pastor/pastor.entity';
import { PastorDto } from '../pastor/pastor.dto';
import { Event } from '../event/event.entity';
import { EventDto } from '../event/event.dto';
import { ContactInfo } from '../contact/contact.entity';
import { ContactInfoPublicDto } from '../contact/contact.dto';
import { SocialLink } from '../social/social.entity';
import { SocialDto } from '../social/social.dto';
import { FileStorageService } from '../fileStorage/fileStorage.service';
import { GrowInFaithService } from '../growInFaith/growInFaith.service';
import { GrowInFaith } from '../growInFaith/growInFaith.entity';
import { GrowingInFaithDto } from '../growInFaith/growInFaith.dto';
import { BeliefService } from '../belief/belief.service';
import { BeliefDto, BeliefItemDto } from '../belief/belief.dto';
import { Belief } from '../belief/belief.entity';
import { CallToAction, CTAButton } from '../cta/cta.entity';
import { CallToActionDto, CTAButtonDto } from '../cta/cta.dto';
import { PaymentOptionService } from '../payment/paymentOption.service';
import { PaymentOption } from '../payment/paymentOption.entity';
import { GiveService } from '../give/give.service';
import { Give } from '../give/give.entity';
import { GiveDto, toCurrencyDto, toGivingAreaDto } from '../give/give.dto';

export class PublicContentController {
  private heroService = new HeroService();
  private eventService = new EventService();
  private ministryService = new MinistryService();
  private sermonService = new SermonService();
  private galleryService = new GalleryService();
  private aboutService = new AboutService();
  private pastorService = new PastorService();
  private footerService = new FooterService();
  private itemTagService = new ItemTagService();
  private contactService = new ContactInfoService();
  private scheduleProgramService = new ScheduledProgramService();
  private nextStepService = new NextStepService();
  private ctaService = new CallToActionService();
  private liveService = new LiveService();
  private siteConfigService = new SiteConfigService();
  private statisticsService = new StatisticsService();
  private fileStorageService = new FileStorageService();
  private growingInFaithService = new GrowInFaithService();
  private beliefService = new BeliefService();
  private paymentOptionService = new PaymentOptionService();
  private giveService = new GiveService();

  // GET /api/public/home
  home = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        about,
        pastor,
        ministries,
        services,
        sermons,
        events,
        contact,
        gallery,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.HOME),
        this.aboutService.find(),
        this.pastorService.leadPastor(),
        this.ministryService.findAll(),
        this.scheduleProgramService.findAll(),
        this.sermonService.findRecent(8),
        this.eventService.findUpcomingEvents(5),
        this.contactService.find(),
        this.galleryService.findRecent(10),
        this.footerService.getFooter(),
      ])

      // Compose response matching your attached data structure
      // Adjust and format as necessary for exact shape
      res.json({
        hero,
        services: await Promise.all(services.map(this.toScheduleProgramDto)),
        about: this.toAboutDto(about),
        pastor: await this.toPastorDto(pastor),
        ministries: ministries.map(this.toMinistryDto.bind(this)),
        events: await Promise.all(events.map(this.toEventDto.bind(this))),
        sermons: await Promise.all(sermons.map(this.toSermonDto.bind(this))),
        contact: this.toContactDto(contact),
        gallery,
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/about
  about = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        about,
        pastor,
        ministries,
        statistics,
        growingInFaith,
        belief,
        contact,
        callToAction,
        footer,
      ] = await Promise.all([
        this.aboutService.find(),
        this.pastorService.leadPastor(),
        this.ministryService.findAll(),
        this.statisticsService.find(),
        this.growingInFaithService.findOne(),
        this.beliefService.find(),
        this.contactService.find(),
        this.ctaService.findByPage(SpecificPage.ABOUT),
        this.footerService.getFooter(),
      ])
      res.json({
        about: this.toAboutDto(about),
        pastor: await this.toPastorDto(pastor),
        ministries: ministries.map(this.toMinistryDto.bind(this)),
        statistics: await this.toStatisticsDto(statistics),
        growingInFaith: this.toGrowInFaithDto(growingInFaith),
        beliefs: this.toBeliefsDto(belief),
        findUs: this.toContactDto(contact),
        callToAction: this.toCallToActionDto(callToAction),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/ministries
  ministries = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        ministries,
        upcomingEvents,
        questionNextStep,
        cta,
        footer,
      ] = await Promise.all([
        this.ministryService.findAll(),
        this.eventService.findUpcomingEvents(),
        this.nextStepService.findOne(NextStepVariants.QuestionNextStep),
        this.ctaService.findByPage(SpecificPage.MINISTRY),
        this.footerService.getFooter(),
      ]);
      res.json({
        ministries,
        upcomingEvents: await Promise.all(upcomingEvents.map(this.toEventDto.bind(this))),
        questionNextStep,
        cta,
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/events
  events = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        eventHero,
        filters,
        upcomingEvents,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.EVENT),
        this.itemTagService.findByRelation("event"),
        this.eventService.findUpcomingEvents(),
        this.footerService.getFooter(),
      ]);
      res.json({
        hero: eventHero,
        filters,
        events: await Promise.all(upcomingEvents.map(this.toEventDto.bind(this))),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/sermons
  sermons = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        sermons,
        filters,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.SERMON),
        this.sermonService.findAllSermons(),
        this.itemTagService.findByRelation("sermon"),
        this.footerService.getFooter(),
      ])

      res.json({
        hero,
        filters: filters.map(this.toTagDto.bind(this)),
        sermons: await Promise.all(sermons.map(this.toSermonDto.bind(this))),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/contact
  contact = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        contactHero,
        contact,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.CONTACT),
        this.contactService.find(),
        this.footerService.getFooter(),
      ]);
      // Add call to a ContactService if exists or static data
      res.json({
        hero: contactHero,
        contact,
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/give
  give = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        giveHero,
        giveData,
        paymentOptions,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.GIVE),
        this.giveService.find(),
        this.paymentOptionService.findEnabledOptions(),
        this.footerService.getFooter(),
      ]);
      res.json({
        hero: giveHero,
        giveData: this.giveDataDto(giveData),
        paymentOptions: paymentOptions.map(this.toPaymentOptionsDto.bind(this)),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/gallery
  gallery = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        galleryData,
        filters,
        events,
      ] = await Promise.all([
        this.galleryService.galleryHero(),
        this.galleryService.galleryItemsForPage(),
        this.itemTagService.findByRelation("gallery"),
        this.eventService.findUpcomingEvents(),
      ])
      res.json({
        hero,
        gallery: {
          ...hero,
          images: galleryData.map(this.toGalleryDto.bind(this)),
          filters: filters.map(this.toTagDto.bind(this)),
        },
        events: {
          title: "Upcoming Events",
          subtitle: "Join us at these upcoming programs",
          images: events.map(e => e.image),
          button: { text: "View All Events", href: "/events" }
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/watch-live
  watchLive = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        upcomingServices,
        recentServices,
        footer,
        callToAction,
      ] = await Promise.all([
        this.scheduleProgramService.findUpcomingServices(),
        this.sermonService.findRecent(4),
        this.footerService.getFooter(),
        this.ctaService.findByPage(SpecificPage.WATCH_LIVE),
      ])
      // let liveStream = await this.liveService.getCachedLiveEvent();
      // if (!liveStream) {
      //   liveStream = await this.liveService.pollLiveEvent();
      // }

      // if (!liveStream) {
      //   liveStream = await this.liveService.getLastestLive()
      // }
      const liveStream = await this.liveService.getLastestLive()

      res.json({
        liveStream: {
          title: "Live Stream",
          status: liveStream.isLive ? "online" : "offline",
          url: liveStream.videoUrl
        },
        upcomingServices: {
          title: "Upcoming Services",
          services: upcomingServices,
          message: "Service schedule will be updated shortly."
        },
        recentServices: {
          title: "Recent Services",
          services: recentServices,
          message: "Recent recordings will be available soon."
        },
        callToAction: this.toCallToActionDto(callToAction),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  async liveUpdatesSSE(req: Request, res: Response) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const sendEvent = (data: any) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const onLiveUpdate = (liveData: any) => {
      sendEvent(liveData);
    };

    // Subscribe to liveUpdated events
    this.liveService.on('liveUpdated', onLiveUpdate);
    
    // Optionally, send latest cached event immediately on connection
    const cachedLive = await this.liveService.getCachedLiveEvent();
    if (cachedLive) {
      sendEvent(cachedLive);
    }

    const intervalId = setInterval(async () => {
      const liveEvent = await this.liveService.getCachedLiveEvent();
      sendEvent(liveEvent);
    }, 60000);

    req.on('close', () => {
      clearInterval(intervalId);
      this.liveService.off('liveUpdated', onLiveUpdate);
      res.end();
    });
  }

  async siteConfig(_req: Request, res: Response) {
    const isComingSoonMode = await this.siteConfigService.getConfig('comingSoon') as boolean || false;
    const response: SiteConfigResponse = {
      isComingSoonMode,
      comingSoonConfig: isComingSoonMode ? {
        title: "Something Amazing is Coming",
        subtitle: "We're building something special for you",
        message: "Our new website is under construction. We're working hard to give you the best experience possible.",
        launchDate: "2024-12-31T00:00:00Z", // You can update this
        contactEmail: "info@yourchurch.com",
        socialLinks: {
          facebook: "https://facebook.com/yourchurch",
          twitter: "https://twitter.com/yourchurch",
          instagram: "https://instagram.com/yourchurch"
        }
      } : undefined
    };

    res.json(response);
  }

  private async toScheduleProgramDto(scheduleProgram: ScheduledProgram): Promise<ScheduledProgramDto> {
    return {
      id: scheduleProgram.id,
      title: scheduleProgram.title,
      description: scheduleProgram.description,
      scheduledDay: scheduleProgram.scheduledDay,
      startTime: format(parse(scheduleProgram.startTime, "HH:mm:ss", new Date()), "h:mm a"),
      endTime: format(parse(scheduleProgram.endTime, "HH:mm:ss", new Date()), "h:mm a"),
      location: scheduleProgram.location,
      icon: scheduleProgram.icon,
      image: scheduleProgram.image ? await this.fileStorageService.getDownloadUrl(scheduleProgram.image) : "",
    };
  }

  private async toSermonDto(sermon: Sermon): Promise<SermonDto> {
    return {
      id: sermon.id,
      title: sermon.title,
      minister: sermon.minister,
      duration: sermon.duration,
      date: format(sermon.date, "iii. do MMM., yyyy"),
      image: await this.fileStorageService.getDownloadUrl(sermon.image),
      featured: sermon.featured,
      videoUrl: sermon.videoUrl,
      tags: sermon.tags?.map(t => t.label),
    };
  }

  private async toStatisticsDto(statistics: Statistics): Promise<StatisticsDto> {
    return {
      backgroundImage: statistics.backgroundImage ? await this.fileStorageService.getDownloadUrl(statistics.backgroundImage) : "",
      statItems: statistics.statItems.map(item => this.toStatItemDto(item)),
    };
  }

  private toStatItemDto(statItem: StatItem): StatItemDto {
    return {
      id: statItem.id,
      statisticsId: statItem.statisticsId,
      number: statItem.number,
      label: statItem.label,
      icon: statItem.icon,
    };
  }

  private toAboutDto(about: About): AboutDto {
    return {
      mainTitle: about.mainTitle,
      highlightedTitle: about.highlightedTitle,
      description: about.description,
      story: this.toStoryDto(about.story),
      values: this.toValuesDto(about.values)
    };
  }

  private toStoryDto(story: Story): StoryDto {
    return {
      id: story.id,
      title: story.title,
      content: story.content,
      stats: story.stats?.map(this.storyStatDto.bind(this)),
    };
  }

  private storyStatDto(stat: StoryStat): StoryStatDto {
    return {
      id: stat.id,
      text: stat.text,
    };
  }

  private toValuesDto(values: Values): ValuesDto {
    return {
      id: values.id,
      title: values.title,
      subtitle: values.subtitle,
      items: values.items?.map(v => this.toValueItemDto(v))
    };
  }

  private toValueItemDto(valueItem: ValueItem): ValueItemDto {
    return {
      id: valueItem.id,
      icon: valueItem.icon,
      title: valueItem.title,
      description: valueItem.description,
    };
  }

  private async toGalleryDto(gallery: GalleryItem): Promise<GalleryItemDto> {
    return {
      id: gallery.id,
      src: await this.fileStorageService.getDownloadUrl(gallery.src),
      alt: gallery.alt,
      caption: gallery.caption,
      date: format(gallery.date, "iii. do MMM., yyyy"),
      tags: gallery.tags?.map(this.toTagDto.bind(this)),
    };
  }

  private toTagDto(tag: ItemTag): ItemTagDto {
    return {
      id: tag.id,
      label: tag.label,
      active: tag.isActive,
    };
  }

  private toMinistryDto(ministry: Ministry): MinistryDto {
    return {
      id: ministry.id,
      icon: ministry.icon,
      title: ministry.title,
      description: ministry.description,
      meetingTime: ministry.meetingTime,
      location: ministry.location,
      leader: ministry.leader,
      members: ministry.members,
      activities: ministry.activities?.map(this.toMinistryActivityDto.bind(this)),
    };
  }

  private toMinistryActivityDto(activity: MinistryActivity): MinistryActivityDto {
    return {
      activityName: activity.activityName,
    };
  }

  private async toPastorDto(pastor: Pastor | null): Promise<PastorDto | null> {
    if (!pastor) return null;
    return {
      id: pastor.id,
      image: await this.fileStorageService.getDownloadUrl(pastor.image),
      role: pastor.role,
      name: pastor.name,
      description: pastor.description,
      quote: pastor.quote,
      achievements: pastor.achievements,
      ministry: pastor.ministry,
    };
  }

  private async toEventDto(event: Event): Promise<EventDto> {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: format(event.startDate, "iii. do") + " - " + format(event.endDate, "iii. do MMM., yyyy"),
      location: event.location,
      image: await this.fileStorageService.getDownloadUrl(event.image),
      tags: event.tags?.map(this.toTagDto.bind(this)),
    };
  }

  private toContactDto(contact: ContactInfo): ContactInfoPublicDto {
    return {
      id: contact.id,
      title: contact.title,
      subtitle: contact.subtitle,
      social: {
        title: "Media Platforms",
        platforms: contact.socialPlatforms.map(this.toSocialDto.bind(this))
      },
      address: {
        title: "Address",
        location: contact.address,
        email: contact.email,
      },
      contact: {
        title: "Our Hot Lines",
        phones: contact.phones,
        chat: "Chat here",
      },
    };
  }

  private toSocialDto(social: SocialLink): SocialDto {
    return {
      id: social.id,
      name: social.name,
      platform: social.platform,
      icon: social.icon,
      url: social.url,
    };
  }

  private toGrowInFaithDto(growInFaith: GrowInFaith): GrowingInFaithDto {
    return {
      id: growInFaith.id,
      title: growInFaith.title,
      description: growInFaith.description,
      secondDescription: growInFaith.secondDescription,
      image: growInFaith.image,
      buttonText: growInFaith.buttonText,
      buttonLink: growInFaith.buttonLink,
    }
  }

  private toBeliefsDto(belief: Belief): BeliefDto {
    return {
      id: belief.id,
      title: belief.title,
      subtitle: belief.subtitle,
      items: belief.items?.map(this.toBeliefItemDto.bind(this)),
    }
  }

  private toBeliefItemDto(item: BeliefItemDto): BeliefItemDto {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
    }
  }

  private toCallToActionDto(cta: CallToAction): CallToActionDto {
    return {
      id: cta.id,
      title: cta.title,
      subtitle: cta.subtitle,
      buttons: cta.buttons?.map(this.toCTAButtonDto.bind(this)),
    }
  }

  private toCTAButtonDto(button: CTAButton): CTAButtonDto {
    return {
      id: button.id,
      text: button.text,
      variant: button.variant,
      url: button.url,
      icon: button.icon,
    }
  }

  private toPaymentOptionsDto(paymentOption: PaymentOption) {
    return {
      title: paymentOption.title,
      details: JSON.parse(paymentOption.config),
    }
  }

  private giveDataDto(giveData: Give): GiveDto {
    return {
      id: giveData.id,
      optionsHeading: giveData.optionsHeading,
      currencies: giveData.currencies?.map(toCurrencyDto.bind(this)),
      givingArea: giveData.givingArea?.map(toGivingAreaDto.bind(this)),
    }
  }
}
