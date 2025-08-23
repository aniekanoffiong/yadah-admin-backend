import { Router } from 'express';
import { SiteLinkController } from './siteLink.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateSiteLinkDto } from './siteLink.dto';

const siteLinkRouter = Router();
const siteLinkController = new SiteLinkController();

siteLinkRouter.get(
  '/',
  authorizationMiddleware('get.siteLink'),
  siteLinkController.getAll.bind(siteLinkController)
);

siteLinkRouter.get(
  '/:id',
  authorizationMiddleware('get.siteLink'),
  siteLinkController.getById.bind(siteLinkController)
);

siteLinkRouter.post(
  '/',
  authorizationMiddleware('create.siteLink'),
  validationMiddleware(CreateSiteLinkDto),
  siteLinkController.create.bind(siteLinkController)
);

siteLinkRouter.put(
  '/:id',
  authorizationMiddleware('update.siteLink'),
  validationMiddleware(CreateSiteLinkDto),
  siteLinkController.update.bind(siteLinkController)
);

siteLinkRouter.delete(
  '/:id',
  authorizationMiddleware('delete.siteLink'),
  siteLinkController.remove.bind(siteLinkController)
);

export { siteLinkRouter };
