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
        gallery,
        footer,
      ] = await Promise.all([
        this.heroService.findByPage(SpecificPage.HOME),
        this.aboutService.find(),
        this.pastorService.leadPastor(),
        this.ministryService.findAll(),
        this.scheduleProgramService.findAllRegularPrograms(),
        this.sermonService.findRecent(8),
        this.eventService.findUpcomingEvents(5),
        this.galleryService.findRecent(10),
        this.footerService.find(),
      ])

      // Compose response matching your attached data structure
      // Adjust and format as necessary for exact shape
      res.json({
        hero,
        services,
        about,
        pastor,
        ministries,
        events,
        sermons,
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
        cta
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
        sermons
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
        this.galleryService.findAllItems(),
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
        liveStream,
        upcomingServices,
        recentServices,
      ] = await Promise.all([
        this.sermonService.getLiveStreamData(),
        this.scheduleProgramService.findUpcomingServices(),
        this.sermonService.findRecent(4),
      ])
      res.json({ liveStream, upcomingServices, recentServices });
    } catch (error) {
      next(error);
    }
  };
}
