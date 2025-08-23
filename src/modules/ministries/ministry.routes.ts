import { Router } from 'express';
import { MinistryController } from './ministry.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateMinistryDto } from './ministry.dto';

const ministryRouter = Router();
const ministryController = new MinistryController();

ministryRouter.get(
  '/',
  authorizationMiddleware('get.ministry'),
  ministryController.getAll.bind(ministryController)
);

ministryRouter.get(
  '/:id',
  authorizationMiddleware('get.ministry`'),
  ministryController.getById.bind(ministryController)
);

ministryRouter.post(
  '/',
  authorizationMiddleware('create.ministry'),
  validationMiddleware(CreateMinistryDto),
  ministryController.create.bind(ministryController)
);

ministryRouter.put(
  '/:id',
  authorizationMiddleware('update.ministry'),
  validationMiddleware(CreateMinistryDto),
  ministryController.update.bind(ministryController)
);

ministryRouter.delete(
  '/:id',
  authorizationMiddleware('delete.ministry'),
  ministryController.remove.bind(ministryController)
);

export { ministryRouter };
