import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import { PaymentOptionController } from './paymentOption.controller';

const paymentOptionRouter = Router();
const paymentOptionController = new PaymentOptionController();

paymentOptionRouter.get('/', authorizationMiddleware('get.paymentOption'), paymentOptionController.getAll.bind(paymentOptionController));
paymentOptionRouter.get('/:id', authorizationMiddleware('get.paymentOption'), paymentOptionController.getById.bind(paymentOptionController));
paymentOptionRouter.post('/', authorizationMiddleware('create.paymentOption'), paymentOptionController.create.bind(paymentOptionController));
paymentOptionRouter.put('/:id', authorizationMiddleware('update.paymentOption'), paymentOptionController.update.bind(paymentOptionController));
paymentOptionRouter.delete('/:id', authorizationMiddleware('delete.paymentOption'), paymentOptionController.remove.bind(paymentOptionController));

export { paymentOptionRouter };
