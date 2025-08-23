import { Router } from 'express';
import { GivingAreaController } from './givingArea.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateGivingAreaDto } from './givingArea.dto';

const givingAreaRouter = Router();
const givingAreaController = new GivingAreaController();

// Item Tags
givingAreaRouter.get(
  '/',
  authorizationMiddleware('get.givingArea'),
  givingAreaController.getAllTags.bind(givingAreaController)
);

givingAreaRouter.get(
  '/:id',
  authorizationMiddleware('get.givingArea'),
  givingAreaController.getTagById.bind(givingAreaController)
);

givingAreaRouter.post(
  '/',
  authorizationMiddleware('create.givingArea'),
  validationMiddleware(CreateGivingAreaDto),
  givingAreaController.createTag.bind(givingAreaController)
);

givingAreaRouter.put(
  '/:id',
  authorizationMiddleware('update.givingArea'),
  validationMiddleware(CreateGivingAreaDto),
  givingAreaController.updateTag.bind(givingAreaController)
);

givingAreaRouter.delete(
  '/:id',
  authorizationMiddleware('delete.givingArea'),
  givingAreaController.deleteTag.bind(givingAreaController)
);

export { givingAreaRouter };
