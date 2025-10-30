import { Router } from 'express';
import { ContactMessageController } from './contactMessage.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const contactMessageRouter = Router();
const controller = new ContactMessageController();

contactMessageRouter.post(
  '/',
  authorizationMiddleware('create.contactMessage'),
  controller.create.bind(controller)
);

contactMessageRouter.get(
  '/',
  authorizationMiddleware('get.contactMessage'),
  controller.findAll.bind(controller)
);

contactMessageRouter.get(
  '/:id',
  authorizationMiddleware('get.contactMessage'),
  controller.findById.bind(controller)
);

contactMessageRouter.delete(
  '/:id',
  authorizationMiddleware('delete.contactMessage'),
  controller.delete.bind(controller)
);

export default contactMessageRouter;
