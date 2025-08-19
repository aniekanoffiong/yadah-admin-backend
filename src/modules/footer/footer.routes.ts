import { Router } from 'express';
import { FooterController } from './footer.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const footerRouter = Router();
const footerController = new FooterController();

footerRouter.get('/', authorizationMiddleware('get.footer'), footerController.getAll.bind(footerController));
footerRouter.get('/:id', authorizationMiddleware('get.event'), footerController.getById.bind(footerController));
footerRouter.post('/', authorizationMiddleware('create.event'), footerController.create.bind(footerController));
footerRouter.put('/:id', authorizationMiddleware('update.event'), footerController.update.bind(footerController));
footerRouter.delete('/:id', authorizationMiddleware('delete.event'), footerController.remove.bind(footerController));

export { footerRouter };
