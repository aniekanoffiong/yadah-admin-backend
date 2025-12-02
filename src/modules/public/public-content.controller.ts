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
import { NextStep, NextStepItem, NextStepVariants } from '../nextStep/nextStep.entity';
import { CallToActionService } from '../cta/cta.service';
import { Platform, SpecificPage, SpecificPageSection } from '../../utils/enums';
import { LiveService } from '../live/live.service';
import { SiteConfigResponse } from '../site-config/siteConfig.interface';
import { CONFIG_ITEM_KEYS, SiteConfigService } from '../site-config/siteConfig.service';
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
import { GalleryItemDto, GalleryItemPublicResponseDto } from '../gallery/gallery.dto';
import { ItemTag } from '../itemTag/itemTag.entity';
import { ItemTagDto, ItemTagResponseDto } from '../itemTag/itemTag.dto';
import { Ministry, MinistryActivity } from '../ministries/ministry.entity';
import { MinistryActivityDto, MinistryDto } from '../ministries/ministry.dto';
import { Pastor } from '../pastor/pastor.entity';
import { PastorDetailsDto, PastorDto } from '../pastor/pastor.dto';
import { Event } from '../event/event.entity';
import { EventDto, EventResponseDto } from '../event/event.dto';
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
import { CallToAction, CTAAddedInfo, CTAButton } from '../cta/cta.entity';
import { CallToActionDto, CTAAddedInfoDto, CTAButtonDto } from '../cta/cta.dto';
import { PaymentOptionService } from '../payment/paymentOption.service';
import { PaymentOption } from '../payment/paymentOption.entity';
import { GiveService } from '../give/give.service';
import { Give } from '../give/give.entity';
import { GiveDto, toCurrencyDto, toGivingAreaDto } from '../give/give.dto';
import { YoutubeCronScheduler } from '../live/external/youtube.cron-scheduler';
import { SocialLinkService } from '../social/social.service';
import { Live } from '../live/live.entity';
import { WatchLiveDto } from '../live/live.dto';
import { YoutubeIntegrationService } from '../live/external/youtube-integration.service';
import { isoDurationToHuman } from '../../utils/isoDuration';
import { NextStepDto, NextStepItemDto } from '../nextStep/nextStep.dto';
import { toSlug } from '../../utils/toSlug';
import { mapOptionToDescription, mapOptionToName } from '../payment/paymentOption.dto';

export class PublicContentController {
  private heroService = new HeroService();
  private eventService = new EventService();
  private ministryService = new MinistryService();
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
  private youtubeCronScheduler = new YoutubeCronScheduler();
  private socialLinkService = new SocialLinkService();
  private youtubeIntegrationService = new YoutubeIntegrationService();

  // GET /api/v1/public/home
  home = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        about,
        pastor,
        ministries,
        services,
        givingImpact,
        sermons,
        featuredSermon,
        socialYoutube,
        events,
        nextSteps,
        contact,
        gallery,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.HOME),
        this.aboutService.find(),
        this.pastorService.leadPastor(),
        this.ministryService.findAll(),
        this.scheduleProgramService.findAll(),
        this.ctaService.findByPageSection(SpecificPage.HOME, SpecificPageSection.GIVING),
        this.liveService.findRecent(6),
        this.liveService.findFeatured(),
        this.socialLinkService.findByPlatform(Platform.YOUTUBE),
        this.eventService.findUpcomingEvents(5),
        this.nextStepService.findOne(NextStepVariants.StandardNextStep),
        this.contactService.find(),
        this.galleryService.findRecent(10),
        this.footerService.getFooter(),
      ])

      // Compose response matching your attached data structure
      // Adjust and format as necessary for exact shape
      res.json({
        hero,
        services: await Promise.all(services.map(this.toScheduleProgramDto.bind(this))),
        about: this.toAboutDto(about),
        pastor: await this.toPastorDto(pastor),
        givingImpact: await this.toCallToActionDto(givingImpact),
        ministries: this.toMinistriesDto(ministries),
        events: await Promise.all(events.map(this.toEventDto.bind(this))),
        sermons: await this.toSermonDataDto(sermons, featuredSermon!, socialYoutube),
        contact: this.toContactDto(contact),
        nextSteps,
        gallery,
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/about
  about = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
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
        this.heroService.findByPage(SpecificPage.ABOUT),
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
        hero,
        about: this.toAboutDto(about),
        pastor: await this.toPastorDto(pastor),
        ministries: ministries.map(this.toMinistryDto.bind(this)),
        statistics: await this.toStatisticsDto(statistics),
        growingInFaith: this.toGrowInFaithDto(growingInFaith),
        beliefs: this.toBeliefsDto(belief),
        findUs: this.toContactDto(contact),
        callToAction: await this.toCallToActionDto(callToAction),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/about/:slug
  pastorBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const [
        hero,
        pastor,
        sermons,
        cta,
        mainCta,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.PASTOR),
        this.pastorService.findBySlug(slug),
        this.liveService.findRecent(4),
        this.ctaService.findByPageSection(SpecificPage.PASTOR, SpecificPageSection.PASTOR_DETAILS),
        this.ctaService.findByPage(SpecificPage.PASTOR),
      ]);

      res.json({
        hero,
        sermons: await Promise.all(sermons.map(this.toLiveDto.bind(this))),
        pastor: await this.toPastorDetailsDto(pastor!),
        cta: await this.toCallToActionDto(cta),
        mainCta: await this.toCallToActionDto(mainCta),
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/ministries
  ministries = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        ministries,
        upcomingEvents,
        questionNextStep,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.MINISTRY),
        this.ministryService.findAll(),
        this.eventService.findUpcomingEvents(),
        this.nextStepService.findOne(NextStepVariants.QuestionNextStep),
        this.footerService.getFooter(),
      ]);
      res.json({
        hero,
        ministries,
        events: {
          title: "Upcoming Events",
          subtitle: upcomingEvents.length > 0 ? "See our upcoming Events" : "There are no upcoming events at this time",
          images: await Promise.all(upcomingEvents.map(this.toEventDto.bind(this))),
          button: { text: "View All Events", link: "/events" },
        },
        questionNextStep: this.toNextStepDto(questionNextStep),
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/events
  events = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        filters,
        upcomingEvents,
        nextStep,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.EVENT),
        this.itemTagService.findByRelation("event"),
        this.eventService.findUpcomingEvents(),
        this.nextStepService.findOne(NextStepVariants.StandardNextStep)
      ]);
      res.json({
        hero,
        filters: filters.map(this.toTagDto.bind(this)),
        events: await Promise.all(upcomingEvents.map(this.toEventDto.bind(this))),
        nextStep: this.toNextStepDto(nextStep) 
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/sermons
  sermons = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        featured,
        sermons,
        cta,
        socialYoutube
      ] = await Promise.all([
        this.liveService.findFeatured(),
        this.liveService.findRecent(12),
        this.ctaService.findByPage(SpecificPage.SERMON),
        this.socialLinkService.findByPlatform(Platform.YOUTUBE),
      ])

      res.json({
        hero: await this.toLiveDto(featured!),
        sermons: await Promise.all(sermons.map(this.toLiveDto.bind(this))),
        cta: await this.toCallToActionDto(cta),
        youtubeLink: socialYoutube?.url,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/contact
  contact = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        contactHero,
        contact,
        callToAction,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.CONTACT),
        this.contactService.find(),
        this.ctaService.findByPage(SpecificPage.CONTACT),
      ]);

      res.json({
        hero: contactHero,
        contact: this.toContactDto(contact),
        callToAction: await this.toCallToActionDto(callToAction),
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/public/contact
  saveContactRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contactData = req.body;
      // Validate and process contactData
      res.status(201).json({ message: 'Contact request saved successfully', data: contactData });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/give
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

  // GET /api/v1/public/gallery
  gallery = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        hero,
        galleryData,
        filters,
        socialInstagram,
        events,
        footer,
      ] = await Promise.all([
        this.galleryService.galleryHero(),
        this.galleryService.galleryItemsForPage(),
        this.itemTagService.findByRelation("gallery"),
        this.socialLinkService.findByPlatform(Platform.INSTAGRAM),
        this.eventService.findUpcomingEvents(),
        this.footerService.getFooter(),
      ])
      res.json({
        hero,
        gallery: {
          ...hero,
          images: galleryData.map(this.toGalleryDto.bind(this)),
          filters: filters.map(this.toTagDto.bind(this)),
          socialInstagram,
        },
        events: {
          title: "Upcoming Events",
          subtitle: "Join us at these upcoming programs",
          images: events.map(e => e.image),
          button: { text: "View All Events", href: "/events" }
        },
        footer,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/watch-live
  watchLive = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        upcomingServices,
        recentServices,
        callToAction,
      ] = await Promise.all([
        this.scheduleProgramService.findUpcomingServices(),
        this.liveService.findRecent(8),
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
          services: await Promise.all(upcomingServices.map(this.toScheduleProgramDto.bind(this))),
          message: "Service schedule will be updated shortly."
        },
        recentServices: {
          title: "Recent Services",
          siubtitle: "Catch up on recent messages and worship services you may have missed.",
          services: await Promise.all(recentServices.map(this.toLiveDto.bind(this))),
          message: "Recent recordings will be available soon."
        },
        callToAction: await this.toCallToActionDto(callToAction),
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/public/live-stream-events
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
    this.youtubeCronScheduler.on('liveUpdated', onLiveUpdate);
    
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

  // /api/v1/public/youtube/videos
  async youtubeVideos(req: Request, res: Response) {
    const { maxResults } = req.query
    const videos = await this.liveService.findRecent(Number(maxResults) ?? 10)
    res.json({
      success: true,
      data: videos
    })
  }

  // /api/v1/public/youtube/latest
   async youtubeLatestVideo(req: Request, res: Response) {
    const latestVideo = await this.liveService.getLastestLive()
    res.json({ 
      success: true,
      data: await this.toLiveDto(latestVideo)
    })
  }

  // /api/v1/public/youtube/live-status
  async youtubeLiveStatus(req: Request, res: Response) {
    const latestVideo = await this.liveService.getLastestLive()
    res.json({
      success: true,
      data: {
        isLive: latestVideo.isLive,
        videoId: this.liveService.extractYoutubeVideoId(latestVideo.videoUrl),
        title: latestVideo.title,
        date: latestVideo.date,
        startTime: latestVideo.startTime,
        viewerCount: latestVideo.viewCount,
      }
    });
  }

  // /api/v1/public/site-config
  async siteConfig(req: Request, res: Response) {
    const isComingSoonConfig = await this.siteConfigService.getConfig(CONFIG_ITEM_KEYS.COMING_SOON);
    const clientUrl = req.header('Referer')?.replace(/https?:\/\/(www\.)?/, '').split('/')[0] || 'default';
    const isComingSoonMode = isComingSoonConfig?.[clientUrl] as boolean || false;
    // const isComingSoonMode = false;
    const response: SiteConfigResponse = {
      isComingSoonMode,
      comingSoonConfig: isComingSoonMode ? {
        title: "Something Amazing is Coming",
        subtitle: "We're building something special for you",
        message: "Our new website is under construction. We're working hard to give you the best experience possible.",
        launchDate: "2025-10-05T00:00:00Z", // You can update this
        contactEmail: "info@cityofyadah.com",
        socialLinks: {
          instagram: "https://instagram.com/cityofyadah_",
          youtube: "https://youtube.com/@CityofYadah/streams",
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

  private async toGalleryDto(gallery: GalleryItem): Promise<GalleryItemPublicResponseDto> {
    return {
      id: gallery.id,
      src: await this.fileStorageService.getDownloadUrl(gallery.src),
      alt: gallery.alt,
      caption: gallery.caption,
      date: format(gallery.date, "iii. do MMM., yyyy"),
      tags: gallery.tags?.map(this.toTagDto.bind(this)),
    };
  }

  private toTagDto(tag: ItemTag): ItemTagResponseDto {
    return {
      id: toSlug(tag.label),
      label: tag.label,
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
      slug: `/about/${pastor.slug}`,
      image: await this.fileStorageService.getDownloadUrl(pastor.image),
      role: pastor.role,
      name: pastor.name,
      description: pastor.description,
      quote: pastor.quote,
      achievements: pastor.achievements,
      ministry: {
        title: pastor.focusTitle,
        content: pastor.focusContent,
      }
    };
  }

  private async toPastorDetailsDto(pastor: Pastor | null): Promise<PastorDetailsDto | null> {
    if (!pastor) return null;
    return {
      id: pastor.id,
      slug: `/about/${pastor.slug}`,
      image: await this.fileStorageService.getDownloadUrl(pastor.image),
      role: pastor.role,
      about: pastor.about,
      name: pastor.name,
      description: pastor.description,
      others: pastor.others,
      quote: pastor.quote,
      achievements: pastor.achievements,
      journey: pastor.journey,
      focus: pastor.focus,
    };
  }

  private async toEventDto(event: Event): Promise<EventResponseDto> {
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
        latLong: contact.latLong,
        mapAddress: contact.mapAddress,
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

  private async toCallToActionDto(cta: CallToAction): Promise<CallToActionDto> {
    return {
      id: cta.id,
      title: cta.title,
      subtitle: cta.subtitle,
      backgroundImage: cta.backgroundImage ? await this.fileStorageService.getDownloadUrl(cta.backgroundImage) : undefined,
      buttons: cta.buttons?.map(this.toCTAButtonDto.bind(this)),
      stats: cta.addedInfo?.map(this.toCTAAddedInfoDto.bind(this)),
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

  private toCTAAddedInfoDto(info: CTAAddedInfo): CTAAddedInfoDto {
    return {
      id: info.id,
      number: info.value,
      label: info.description,
    }
  }

  private toPaymentOptionsDto(paymentOption: PaymentOption) {
    return {
      title: paymentOption.title,
      name: mapOptionToName(paymentOption.title),
      description: mapOptionToDescription(paymentOption.title),
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

  private toMinistriesDto(ministries: Ministry[]) {
    return {
      title: "Our Ministries",
      subtitle: "Discover where God is calling you to serve and make a lasting impact in the lives of others. Every ministry is an opportunity to grow, connect, and transform lives.",
      items: ministries.map(this.toMinistryDto.bind(this)),
      callToAction: {
        title: "Get Involved",
        subtitle: "Whether you're looking to serve, grow spiritually, or connect with others, we have a place for you. Join a ministry that matches your passion and calling.",
        buttons: [
          {
            text: "View All Ministries",
            link: "/ministries",
            variant: "primary"
          }
        ]
      }
    }
  }

  private async toSermonDataDto(lives: Live[], featured: Live, youtube: SocialLink | null): Promise<{
    title: string;
    highlightedTitle: string;
    subtitle: string;
    featured: {
      id: number;
      title: string;
      pastor?: string;
      date: Date;
      duration: string;
      thumbnailUrl?: string;
      videoUrl: string;
      videoId: string | null;
    };
    sermonList: WatchLiveDto[];
    allVideosUrl?: string;
  }> {
    return {
      title: "Recent",
      highlightedTitle: "Sermons",
      subtitle: "Discover biblical truth through powerful messages that inspire, challenge, and encourage your faith journey.",
      featured: {
        id: featured.id,
        title: this.youtubeIntegrationService.stripTrailingDate(featured.title) ?? "",
        date: featured.date,
        duration: featured?.duration ? isoDurationToHuman(featured.duration) : "0:00",
        thumbnailUrl: featured.thumbnailUrl ? await this.fileStorageService.getDownloadUrl(featured.thumbnailUrl) : undefined,
        videoUrl: featured.videoUrl,
        videoId: this.liveService.extractYoutubeVideoId(featured.videoUrl),
      },
      sermonList: await Promise.all(lives.map(this.toLiveDto.bind(this))),
      allVideosUrl: youtube?.url,
    };
  }

  private async toLiveDto(live: Live): Promise<WatchLiveDto> {
    return {
      id: live.id,
      title: this.youtubeIntegrationService.stripTrailingDate(live.title),
      date: live.date,
      description: live.description,
      thumbnailUrl: live.thumbnailUrl ? await this.fileStorageService.getDownloadUrl(live.thumbnailUrl) : undefined,
      duration: live.duration ? isoDurationToHuman(live.duration) : undefined,
      videoUrl: live.videoUrl,
      videoId: this.liveService.extractYoutubeVideoId(live.videoUrl),
      featured: live.featured,
      isLive: live.isLive,
      startTime: live.startTime,
      endTime: live.endTime,
      viewCount: live.viewCount,
    }
  }

  private toNextStepDto(nextStep: NextStep): NextStepDto {
    return {
      id: nextStep.id,
      title: nextStep.title,
      subtitle: nextStep.subtitle,
      items: nextStep.items.map(this.toNextStepItemDto.bind(this)),
    }
  }

  private toNextStepItemDto(nextStepItem: NextStepItem): NextStepItemDto {
    return {
      id: nextStepItem.id,
      icon: nextStepItem.icon,
      title: nextStepItem.title,
      buttonText: nextStepItem.buttonText,
      buttonLink: nextStepItem.buttonLink,
    }
  }
}
