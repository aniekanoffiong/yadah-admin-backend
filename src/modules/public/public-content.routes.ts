import { Router } from 'express';
import { PublicContentController } from './public-content.controller';

const publicRouter = Router();
const controller = new PublicContentController();

publicRouter.get('/home', controller.home.bind(controller));
publicRouter.get('/ministries', controller.ministries.bind(controller));
publicRouter.get('/events', controller.events.bind(controller));
publicRouter.get('/sermons', controller.sermons.bind(controller));
publicRouter.get('/about', controller.about.bind(controller));
publicRouter.get('/contact', controller.contact.bind(controller));
publicRouter.get('/gallery', controller.gallery.bind(controller));
publicRouter.get('/watch-live', controller.watchLive.bind(controller));
publicRouter.get('/give', controller.give.bind(controller));
publicRouter.get('/live-updates', controller.liveUpdatesSSE.bind(controller));

publicRouter.get('/site-config', controller.siteConfig.bind(controller));
export { publicRouter };
