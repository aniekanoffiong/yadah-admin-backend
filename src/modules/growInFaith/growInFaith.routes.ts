import { Router } from 'express';
import { GrowInFaithController } from './growInFaith.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateGrowInFaithDto } from './growInFaith.dto';

const growInFaithRouter = Router();
const controller = new GrowInFaithController();

growInFaithRouter.get(
  '/:id',
  authorizationMiddleware('get.growInFaith'),
  controller.get.bind(controller)
);

growInFaithRouter.post(
  '/',
  authorizationMiddleware('create.growInFaith'),
  validationMiddleware(CreateGrowInFaithDto),
  controller.create.bind(controller)
);

growInFaithRouter.put(
  '/:id',
  authorizationMiddleware('update.growInFaith'),
  validationMiddleware(CreateGrowInFaithDto),
  controller.update.bind(controller)
);

growInFaithRouter.delete(
  '/:id',
  authorizationMiddleware('delete.growInFaith'),
  controller.remove.bind(controller)
);

export { growInFaithRouter };
