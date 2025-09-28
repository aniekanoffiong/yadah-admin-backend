import { Router } from 'express';
import { StatisticsController } from './statistics.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateStatisticsDto, CreateStatItemDto, UpdateStatItemDto } from './statistics.dto';

const statisticsRouter = Router();
const statisticsController = new StatisticsController();

statisticsRouter.get(
  '/',
  authorizationMiddleware('get.statistics'),
  statisticsController.get.bind(statisticsController)
);

statisticsRouter.put(
  '/:id',
  authorizationMiddleware('update.statistics'),
  validationMiddleware(CreateStatisticsDto),
  statisticsController.update.bind(statisticsController)
);

statisticsRouter.get(
  '/stat-items',
  authorizationMiddleware('get.statistics'),
  statisticsController.allStatItems.bind(statisticsController)
);

statisticsRouter.post(
  '/stat-items',
  authorizationMiddleware('create.statistics'),
  validationMiddleware(CreateStatItemDto),
  statisticsController.createStatItem.bind(statisticsController)
);

statisticsRouter.put(
  '/stat-items/:id',
  authorizationMiddleware('update.statistics'),
  validationMiddleware(UpdateStatItemDto),
  statisticsController.updateStatItem.bind(statisticsController)
);

statisticsRouter.delete(
  '/stat-items/:id',
  authorizationMiddleware('delete.statistics'),
  statisticsController.deleteStatItem.bind(statisticsController)
);

export { statisticsRouter };
