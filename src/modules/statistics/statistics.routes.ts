import { Router } from 'express';
import { StatisticsController } from './statistics.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const statisticsRouter = Router();
const statisticsController = new StatisticsController();

statisticsRouter.get('/', authorizationMiddleware('get.statistics'), statisticsController.getAll.bind(statisticsController));
statisticsRouter.get('/:id', authorizationMiddleware('get.statistics'), statisticsController.getById.bind(statisticsController));
statisticsRouter.post('/', authorizationMiddleware('create.statistics'), statisticsController.create.bind(statisticsController));
statisticsRouter.put('/:id', authorizationMiddleware('update.statistics'), statisticsController.update.bind(statisticsController));
statisticsRouter.delete('/:id', authorizationMiddleware('delete.statistics'), statisticsController.remove.bind(statisticsController));

export { statisticsRouter };
