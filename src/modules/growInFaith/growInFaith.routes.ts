import { Router } from 'express';
import { GrowInFaithController } from './growInFaith.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateGrowInFaithDto } from './growInFaith.dto';

const growInFaithRouter = Router();
const controller = new GrowInFaithController();

growInFaithRouter.get(
  '/',
  authorizationMiddleware('get.growInFaith'),
  controller.get.bind(controller)
);

growInFaithRouter.put(
  '/:id',
  authorizationMiddleware('update.growInFaith'),
  validationMiddleware(CreateGrowInFaithDto),
  controller.update.bind(controller)
);

export { growInFaithRouter };
