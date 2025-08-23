import { Router } from 'express';
import { CallToActionController } from './cta.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateCallToActionDto } from './cta.dto';

const ctaRouter = Router();
const ctaController = new CallToActionController();

ctaRouter.get(
  '/',
  authorizationMiddleware('get.callToAction'),
  ctaController.getAll.bind(ctaController)
);

ctaRouter.get(
  '/:id',
  authorizationMiddleware('get.callToAction'),
  ctaController.getById.bind(ctaController)
);

ctaRouter.post(
  '/',
  authorizationMiddleware('create.callToAction'),
  validationMiddleware(CreateCallToActionDto),
  ctaController.create.bind(ctaController)
);

ctaRouter.put(
  '/:id',
  authorizationMiddleware('update.callToAction'),
  validationMiddleware(CreateCallToActionDto),
  ctaController.update.bind(ctaController)
);

ctaRouter.delete(
  '/:id',
  authorizationMiddleware('delete.callToAction'),
  ctaController.remove.bind(ctaController)
);

export { ctaRouter };
