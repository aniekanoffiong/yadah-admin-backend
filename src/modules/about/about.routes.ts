import { Router } from 'express';
import { AboutController } from './about.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import { AboutDto } from './about.dto';
import validationMiddleware from '../../middlewares/validation.middleware';

const aboutRouter = Router();
const aboutController = new AboutController();

aboutRouter.get(
  '/',
  authorizationMiddleware('get.about'),
  aboutController.getById.bind(aboutController)
);

aboutRouter.put(
  '/:id',
  authorizationMiddleware('update.about'),
  validationMiddleware(AboutDto),
  aboutController.update.bind(aboutController)
);

export { aboutRouter };
