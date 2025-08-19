import { Router } from 'express';
import { SiteLinkController } from './siteLink.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const siteLinkRouter = Router();
const siteLinkController = new SiteLinkController();

siteLinkRouter.get('/', authorizationMiddleware('get.siteLink'), siteLinkController.getAll.bind(siteLinkController));
siteLinkRouter.get('/:id', authorizationMiddleware('get.siteLink'), siteLinkController.getById.bind(siteLinkController));
siteLinkRouter.post('/', authorizationMiddleware('create.siteLink'), siteLinkController.create.bind(siteLinkController));
siteLinkRouter.put('/:id', authorizationMiddleware('update.siteLink'), siteLinkController.update.bind(siteLinkController));
siteLinkRouter.delete('/:id', authorizationMiddleware('delete.siteLink'), siteLinkController.remove.bind(siteLinkController));

export { siteLinkRouter };
