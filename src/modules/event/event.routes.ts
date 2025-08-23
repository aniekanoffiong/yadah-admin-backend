import { Router } from 'express';
import { EventController } from './event.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateEventDto } from './event.dto';

const eventRouter = Router();
const eventController = new EventController();

eventRouter.get(
  '/',
  authorizationMiddleware('get.event'),
  eventController.getAll.bind(eventController)
);

eventRouter.get(
  '/:id',
  authorizationMiddleware('get.event'),
  eventController.getById.bind(eventController)
);

eventRouter.post(
  '/',
  authorizationMiddleware('create.event'),
  validationMiddleware(CreateEventDto),
  eventController.create.bind(eventController)
);

eventRouter.put(
  '/:id',
  authorizationMiddleware('update.event'),
  validationMiddleware(CreateEventDto),
  eventController.update.bind(eventController)
);

eventRouter.delete(
  '/:id',
  authorizationMiddleware('delete.event'),
  eventController.remove.bind(eventController)
);

export { eventRouter };
