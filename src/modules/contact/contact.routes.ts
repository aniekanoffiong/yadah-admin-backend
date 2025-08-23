import { Router } from 'express';
import { ContactInfoController } from './contact.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateContactInfoDto } from './contact.dto';

const contactInfoRouter = Router();
const contactInfoController = new ContactInfoController();

contactInfoRouter.get(
  '/',
  authorizationMiddleware('get.contactInfo'),
  contactInfoController.getAll.bind(contactInfoController)
);

contactInfoRouter.post(
  '/',
  authorizationMiddleware('create.contactInfo'),
  validationMiddleware(CreateContactInfoDto),
  contactInfoController.create.bind(contactInfoController)
);

contactInfoRouter.put(
  '/:id',
  authorizationMiddleware('update.contactInfo'),
  validationMiddleware(CreateContactInfoDto),
  contactInfoController.update.bind(contactInfoController)
);

contactInfoRouter.delete(
  '/:id',
  authorizationMiddleware('delete.contactInfo'),
  contactInfoController.remove.bind(contactInfoController)
);

export { contactInfoRouter };
