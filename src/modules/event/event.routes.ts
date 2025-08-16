import { Router } from 'express';
import { EventController } from './event.controller';

const eventRouter = Router();
const eventController = new EventController();

eventRouter.get('/', eventController.getAll);
eventRouter.get('/:id', eventController.getById);
eventRouter.post('/', eventController.create);
eventRouter.put('/:id', eventController.update);
eventRouter.delete('/:id', eventController.remove);

export { eventRouter };
