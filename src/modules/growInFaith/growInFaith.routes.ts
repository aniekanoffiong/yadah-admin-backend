import { Router } from 'express';
import { GrowInFaithController } from './growInFaith.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const growInFaithRouter = Router();
const controller = new GrowInFaithController();

growInFaithRouter.get('/', authorizationMiddleware('get.growInFaith'), controller.getAll.bind(controller));
growInFaithRouter.get('/:id', authorizationMiddleware('get.growInFaith'), controller.getById.bind(controller));
growInFaithRouter.post('/', authorizationMiddleware('create.growInFaith'), controller.create.bind(controller));
growInFaithRouter.put('/:id', authorizationMiddleware('update.growInFaith'), controller.update.bind(controller));
growInFaithRouter.delete('/:id', authorizationMiddleware('delete.growInFaith'), controller.remove.bind(controller));

export { growInFaithRouter };
