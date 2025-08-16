import { Router } from 'express';
import { PastorController } from './pastor.controller';

const pastorRouter = Router();
const pastorController = new PastorController();

pastorRouter.get('/', pastorController.getAll);
pastorRouter.get('/:id', pastorController.getById);
pastorRouter.post('/', pastorController.create);
pastorRouter.put('/:id', pastorController.update);
pastorRouter.delete('/:id', pastorController.remove);

export { pastorRouter };
