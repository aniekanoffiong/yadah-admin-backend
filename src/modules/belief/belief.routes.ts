import { Router } from 'express';
import { BeliefController } from './belief.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateBeliefDto } from './belief.dto';

const beliefRouter = Router();
const beliefController = new BeliefController();

beliefRouter.get(
  '/', 
  authorizationMiddleware('get.belief'),
  beliefController.getAll.bind(beliefController)
);

beliefRouter.get(
  '/:id', 
  authorizationMiddleware('get.belief'),
  beliefController.getById.bind(beliefController)
);

beliefRouter.post(
  '/', 
  authorizationMiddleware('create.belief'),
  validationMiddleware(CreateBeliefDto),
  beliefController.create.bind(beliefController)
);

beliefRouter.put(
  '/:id', 
  authorizationMiddleware('update.belief'),
  validationMiddleware(CreateBeliefDto),
  beliefController.update.bind(beliefController)
);

beliefRouter.delete(
  '/:id', 
  authorizationMiddleware('delete.belief'),
  beliefController.remove.bind(beliefController)
);

export { beliefRouter };
