import { Router } from 'express';
import { GiveController } from './give.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateCurrencyDto, CreateGivingAreaDto } from './give.dto';

const giveRouter = Router();
const giveController = new GiveController();

giveRouter.get('/:id', authorizationMiddleware("get.give"), giveController.getById.bind(giveController));
giveRouter.put('/:id', authorizationMiddleware("update.give"), giveController.update.bind(giveController));
giveRouter.delete('/:id', authorizationMiddleware("delete.give"), giveController.delete.bind(giveController));

giveRouter.post(
  'currencies',
  authorizationMiddleware("get.give"),
  giveController.allCurrencies.bind(giveController)
);

giveRouter.post(
  'currencies/:id',
  authorizationMiddleware("create.give"),
  validationMiddleware(CreateCurrencyDto),
  giveController.createCurrency.bind(giveController)
);

giveRouter.put(
  'currencies/:id',
  authorizationMiddleware("update.give"),
  validationMiddleware(CreateCurrencyDto),
  giveController.updateCurrency.bind(giveController)
);

giveRouter.delete(
  'currencies/:id',
  authorizationMiddleware("delete.give"),
  giveController.deleteCurrency.bind(giveController)
);


giveRouter.post(
  'giving-area',
  authorizationMiddleware("get.give"),
  giveController.allGivingAreas.bind(giveController)
);

giveRouter.post(
  'giving-area/:id',
  authorizationMiddleware("create.give"),
  validationMiddleware(CreateGivingAreaDto),
  giveController.createGivingArea.bind(giveController)
);

giveRouter.put(
  'giving-area/:id',
  authorizationMiddleware("update.give"),
  validationMiddleware(CreateGivingAreaDto),
  giveController.updateGivingArea.bind(giveController)
);

giveRouter.delete(
  'giving-area/:id',
  authorizationMiddleware("delete.give"),
  giveController.deleteGivingArea.bind(giveController)
);

export default giveRouter;
