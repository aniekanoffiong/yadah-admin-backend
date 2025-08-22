import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import { PastorController } from './pastor.controller';

const pastorRouter = Router();
const pastorController = new PastorController();

pastorRouter.get('/', authorizationMiddleware('get.pastor'), pastorController.getAll.bind(pastorController));
pastorRouter.get('/:id', authorizationMiddleware('get.pastor'), pastorController.getById.bind(pastorController));
pastorRouter.post('/', authorizationMiddleware('create.pastor'), pastorController.create.bind(pastorController));
pastorRouter.put('/:id', authorizationMiddleware('update.pastor'), pastorController.update.bind(pastorController));
pastorRouter.delete('/:id', authorizationMiddleware('delete.pastor'), pastorController.remove.bind(pastorController));

export { pastorRouter };
