import { Router } from 'express';
import { CallToActionController } from './cta.controller';

const ctaRouter = Router();
const ctaController = new CallToActionController();

ctaRouter.get('/', ctaController.getAll);
ctaRouter.get('/:id', ctaController.getById);
ctaRouter.post('/', ctaController.create);
ctaRouter.put('/:id', ctaController.update);
ctaRouter.delete('/:id', ctaController.remove);

export { ctaRouter };
