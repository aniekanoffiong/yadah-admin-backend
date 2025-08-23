import { Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import { PastorController } from './pastor.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreatePastorDto } from './pastor.dto';

const pastorRouter = Router();
const pastorController = new PastorController();

pastorRouter.get(
  '/',
  authorizationMiddleware('get.pastor'),
  pastorController.getAll.bind(pastorController)
);

pastorRouter.get(
  '/:id',
  authorizationMiddleware('get.pastor'),
  pastorController.getById.bind(pastorController)
);

pastorRouter.post(
  '/',
  authorizationMiddleware('create.pastor'),
  validationMiddleware(CreatePastorDto),
  pastorController.create.bind(pastorController)
);

pastorRouter.put(
  '/:id',
  authorizationMiddleware('update.pastor'),
  validationMiddleware(CreatePastorDto),
  pastorController.update.bind(pastorController)
);

pastorRouter.delete(
  '/:id',
  authorizationMiddleware('delete.pastor'),
  pastorController.remove.bind(pastorController)
);

export { pastorRouter };
