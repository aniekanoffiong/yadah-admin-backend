import { Router } from 'express';
import { GrowInFaithController } from './growInFaith.controller';

const growInFaithRouter = Router();
const controller = new GrowInFaithController();

growInFaithRouter.get('/', controller.getAll);
growInFaithRouter.get('/:id', controller.getById);
growInFaithRouter.post('/', controller.create);
growInFaithRouter.put('/:id', controller.update);
growInFaithRouter.delete('/:id', controller.remove);

export { growInFaithRouter };
