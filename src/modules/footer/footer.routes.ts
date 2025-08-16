import { Router } from 'express';
import { FooterController } from './footer.controller';

const footerRouter = Router();
const footerController = new FooterController();

footerRouter.get('/', footerController.getAll);
footerRouter.get('/:id', footerController.getById);
footerRouter.post('/', footerController.create);
footerRouter.put('/:id', footerController.update);
footerRouter.delete('/:id', footerController.remove);

export { footerRouter };
