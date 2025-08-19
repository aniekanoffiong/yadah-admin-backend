import { Router } from 'express';
import { CallToActionController } from './cta.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const ctaRouter = Router();
const ctaController = new CallToActionController();

ctaRouter.get('/', authorizationMiddleware('get.callToAction'), ctaController.getAll.bind(ctaController));
ctaRouter.get('/:id', authorizationMiddleware('get.callToAction'), ctaController.getById.bind(ctaController));
ctaRouter.post('/', authorizationMiddleware('create.callToAction'), ctaController.create.bind(ctaController));
ctaRouter.put('/:id', authorizationMiddleware('update.callToAction'), ctaController.update.bind(ctaController));
ctaRouter.delete('/:id', authorizationMiddleware('delete.callToAction'), ctaController.remove.bind(ctaController));

export { ctaRouter };
