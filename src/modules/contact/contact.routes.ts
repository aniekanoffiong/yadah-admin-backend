import { Router } from 'express';
import { ContactInfoController } from './contact.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const contactInfoRouter = Router();
const contactInfoController = new ContactInfoController();

contactInfoRouter.get('/', authorizationMiddleware('get.contactInfo'), contactInfoController.getAll.bind(contactInfoController));
contactInfoRouter.get('/:id', authorizationMiddleware('get.contactInfo'), contactInfoController.getById.bind(contactInfoController));
contactInfoRouter.post('/', authorizationMiddleware('create.contactInfo'), contactInfoController.create.bind(contactInfoController));
contactInfoRouter.put('/:id', authorizationMiddleware('update.contactInfo'), contactInfoController.update.bind(contactInfoController));
contactInfoRouter.delete('/:id', authorizationMiddleware('delete.contactInfo'), contactInfoController.remove.bind(contactInfoController));

export { contactInfoRouter };
