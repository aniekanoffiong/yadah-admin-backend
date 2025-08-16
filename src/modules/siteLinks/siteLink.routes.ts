import { Router } from 'express';
import { SiteLinkController } from './siteLink.controller';

const siteLinkRouter = Router();
const siteLinkController = new SiteLinkController();

siteLinkRouter.get('/', siteLinkController.getAll);
siteLinkRouter.get('/:id', siteLinkController.getById);
siteLinkRouter.post('/', siteLinkController.create);
siteLinkRouter.put('/:id', siteLinkController.update);
siteLinkRouter.delete('/:id', siteLinkController.remove);

export { siteLinkRouter };
