import { Router } from 'express';
import { ContactInfoController } from './contact.controller';

const contactInfoRouter = Router();
const contactInfoController = new ContactInfoController();

contactInfoRouter.get('/', contactInfoController.getAll);
contactInfoRouter.get('/:id', contactInfoController.getById);
contactInfoRouter.post('/', contactInfoController.create);
contactInfoRouter.put('/:id', contactInfoController.update);
contactInfoRouter.delete('/:id', contactInfoController.remove);

export { contactInfoRouter };
