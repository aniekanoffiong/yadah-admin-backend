import { Router } from 'express';
import { StatisticsController } from './statistics.controller';

const statisticsRouter = Router();
const statisticsController = new StatisticsController();

statisticsRouter.get('/', statisticsController.getAll);
statisticsRouter.get('/:id', statisticsController.getById);
statisticsRouter.post('/', statisticsController.create);
statisticsRouter.put('/:id', statisticsController.update);
statisticsRouter.delete('/:id', statisticsController.remove);

export { statisticsRouter };
