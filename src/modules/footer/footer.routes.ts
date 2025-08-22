import { Router } from 'express';
import { FooterController } from './footer.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const footerRouter = Router();
const footerController = new FooterController();

footerRouter.get('/', authorizationMiddleware('get.footer'), footerController.get.bind(footerController));
footerRouter.post('/', authorizationMiddleware('create.event'), footerController.create.bind(footerController));
footerRouter.put('/:id', authorizationMiddleware('update.event'), footerController.update.bind(footerController));

export { footerRouter };
