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
        services: services.map(this.toScheduleProgramDto),
        about,
        pastor,
        ministries,
        events,
        sermons,
        contact,
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
        ministries
      ] = await Promise.all([
        this.aboutService.find(),
        this.pastorService.leadPastor(),
        this.ministryService.findAll(),
      ])
      res.json({
        about,
        pastor,
        ministries,
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
      ] = await Promise.all([
        this.ministryService.findAll(),
        this.eventService.findUpcomingEvents(),
        this.nextStepService.findOne(NextStepVariants.QuestionNextStep),
        this.ctaService.findByPage(SpecificPage.MINISTRY),
      ]);
      res.json({
        ministries,
        upcomingEvents,
        questionNextStep,
        cta,
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
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.EVENT),
        this.itemTagService.findByRelation("event"),
        this.eventService.findUpcomingEvents(),
      ]);
      res.json({
        hero: eventHero,
        filters,
        events: upcomingEvents,
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
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.SERMON),
        this.sermonService.findAllSermons(),
        this.itemTagService.findByRelation("sermon"),
      ])

      res.json({
        hero,
        filters,
        sermons,
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
        contact
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.CONTACT),
        this.contactService.find(),
      ]);
      // Add call to a ContactService if exists or static data
      res.json({
        hero: contactHero,
        contact,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/public/gallery
  gallery = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        galleryData,
        filters,
      ] = await Promise.all([
        this.galleryService.galleryItemsForPage(),
        this.itemTagService.findByRelation("gallery"),
      ])
      res.json({
        galleryData,
        filters,
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
      ] = await Promise.all([
        this.scheduleProgramService.findUpcomingServices(),
        this.sermonService.findRecent(4),
      ])
      let liveStream = await this.liveService.getCachedLiveEvent();
      if (!liveStream) {
        liveStream = await this.liveService.pollLiveEvent();
      }

      if (!liveStream) {
        liveStream = await this.liveService.getLastestLive()
      }

      res.json({ liveStream, upcomingServices, recentServices });
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

  private toScheduleProgramDto(scheduleProgram: ScheduledProgram): ScheduledProgramDto {
    return {
      id: scheduleProgram.id,
      title: scheduleProgram.title,
      description: scheduleProgram.description,
      scheduledDay: scheduleProgram.scheduledDay,
      startTime: format(parse(scheduleProgram.startTime, "HH:mm:ss", new Date()), "h:mm a"),
      endTime: format(parse(scheduleProgram.endTime, "HH:mm:ss", new Date()), "h:mm a"),
      location: scheduleProgram.location,
      icon: scheduleProgram.icon,
      image: scheduleProgram.image,
    };
  }

  private toSermonDto(sermon: Sermon): SermonDto {
    return {
      id: sermon.id,
      title: sermon.title,
      minister: sermon.minister,
      duration: sermon.duration,
      date: format(sermon.date, "iii. do MMM., yyyy"),
      image: sermon.image,
      featured: sermon.featured,
      videoUrl: sermon.videoUrl,
      tags: sermon.tags.map(t => t.label),
    };
  }
}
