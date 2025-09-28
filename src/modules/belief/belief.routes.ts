import { Router } from 'express';
import { BeliefController } from './belief.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateBeliefDto, CreateBeliefItemDto, UpdateBeliefItemDto } from './belief.dto';

const beliefRouter = Router();
const beliefController = new BeliefController();

beliefRouter.get(
  '/',
  authorizationMiddleware('get.belief'),
  beliefController.get.bind(beliefController)
);

beliefRouter.put(
  '/:id', 
  authorizationMiddleware('update.belief'),
  validationMiddleware(CreateBeliefDto),
  beliefController.update.bind(beliefController)
);

beliefRouter.get(
  '/belief-items',
  authorizationMiddleware('get.belief'),
  beliefController.allBeliefItems.bind(beliefController)
);

beliefRouter.post(
  '/belief-items',
  authorizationMiddleware('create.belief'),
  validationMiddleware(CreateBeliefItemDto),
  beliefController.createBeliefItem.bind(beliefController)
);

beliefRouter.put(
  '/belief-items/:id',
  authorizationMiddleware('update.belief'),
  validationMiddleware(UpdateBeliefItemDto),
  beliefController.updateBeliefItem.bind(beliefController)
);

beliefRouter.delete(
  '/belief-items/:id',
  authorizationMiddleware('delete.belief'),
  beliefController.deleteBeliefItem.bind(beliefController)
);

export { beliefRouter };
