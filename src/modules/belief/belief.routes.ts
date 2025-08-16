import { Router } from 'express';
import { BeliefController } from './belief.controller';

const beliefRouter = Router();
const beliefController = new BeliefController();

beliefRouter.get('/', beliefController.getAll);
beliefRouter.get('/:id', beliefController.getById);
beliefRouter.post('/', beliefController.create);
beliefRouter.put('/:id', beliefController.update);
beliefRouter.delete('/:id', beliefController.remove);

export { beliefRouter };
