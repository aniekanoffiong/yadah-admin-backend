import { Router } from 'express';
import { NextStepController } from './nextStep.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const nextStepRouter = Router();
const nextStepController = new NextStepController();

nextStepRouter.get('/', authorizationMiddleware('get.nextStep'), nextStepController.getById.bind(nextStepController));
nextStepRouter.post('/', authorizationMiddleware('create.nextStep'), nextStepController.create.bind(nextStepController));
nextStepRouter.put('/:id', authorizationMiddleware('update.nextStep'), nextStepController.update.bind(nextStepController));

nextStepRouter.get('/:id', authorizationMiddleware('get.nextStepItem'), nextStepController.findNextStepItem.bind(nextStepController));
nextStepRouter.put('/:id', authorizationMiddleware('update.nextStepItem'), nextStepController.updateNextStepItem.bind(nextStepController));
nextStepRouter.delete('/:id', authorizationMiddleware('delete.nextStep'), nextStepController.removeNextStepItem.bind(nextStepController));

export { nextStepRouter };
