import { Router } from 'express';
import { BeliefController } from './belief.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const beliefRouter = Router();
const beliefController = new BeliefController();

beliefRouter.get('/', authorizationMiddleware('get.belief'), beliefController.getAll.bind(beliefController));
beliefRouter.get('/:id', authorizationMiddleware('get.belief'), beliefController.getById.bind(beliefController));
beliefRouter.post('/', authorizationMiddleware('create.belief'), beliefController.create.bind(beliefController));
beliefRouter.put('/:id', authorizationMiddleware('update.belief'), beliefController.update.bind(beliefController));
beliefRouter.delete('/:id', authorizationMiddleware('delete.belief'), beliefController.remove.bind(beliefController));

export { beliefRouter };
