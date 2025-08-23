import { Router } from 'express';
import { FooterController } from './footer.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateFooterDto } from './footer.dto';

const footerRouter = Router();
const footerController = new FooterController();

footerRouter.get(
  '/',
  authorizationMiddleware('get.footer'),
  footerController.get.bind(footerController)
);

footerRouter.post(
  '/',
  authorizationMiddleware('create.event'),
  validationMiddleware(CreateFooterDto),
  footerController.create.bind(footerController)
);

footerRouter.put(
  '/:id',
  authorizationMiddleware('update.event'),
  validationMiddleware(CreateFooterDto),
  footerController.update.bind(footerController)
);

export { footerRouter };
