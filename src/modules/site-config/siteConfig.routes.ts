import { Router } from 'express';
import { SiteConfigController } from './siteConfig.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const siteConfigRouter = Router();
const siteConfigController = new SiteConfigController();

siteConfigRouter.get(
  '/',
  authorizationMiddleware('get.siteConfig'),
  siteConfigController.getAll.bind(siteConfigController)
);

siteConfigRouter.get(
  '/:key',
  authorizationMiddleware('get.siteConfig'),
  siteConfigController.getByConfigKey.bind(siteConfigController)
);

siteConfigRouter.post(
  '/',
  authorizationMiddleware('create.siteConfig'),
  siteConfigController.create.bind(siteConfigController)
);

siteConfigRouter.delete(
  '/:id',
  authorizationMiddleware('delete.siteConfig'),
  siteConfigController.remove.bind(siteConfigController)
);

export { siteConfigRouter };
