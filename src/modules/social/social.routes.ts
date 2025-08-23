import { Router } from 'express';
import { SocialLinkController } from './social.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateSocialDto } from './social.dto';

const socialLinkRouter = Router();
const socialLinkController = new SocialLinkController();

socialLinkRouter.get(
  '/',
  authorizationMiddleware('get.socialLink'),
  socialLinkController.getAll.bind(socialLinkController)
);

socialLinkRouter.get(
  '/:id',
  authorizationMiddleware('get.socialLink'),
  socialLinkController.getById.bind(socialLinkController)
);

socialLinkRouter.post(
  '/',
  authorizationMiddleware('create.socialLink'),
  validationMiddleware(CreateSocialDto),
  socialLinkController.create.bind(socialLinkController)
);

socialLinkRouter.put(
  '/:id',
  authorizationMiddleware('update.socialLink'),
  validationMiddleware(CreateSocialDto),
  socialLinkController.update.bind(socialLinkController)
);

socialLinkRouter.delete(
  '/:id',
  authorizationMiddleware('delete.socialLink'),
  socialLinkController.remove.bind(socialLinkController)
);

export { socialLinkRouter };
