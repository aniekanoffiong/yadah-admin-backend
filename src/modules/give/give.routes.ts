import { Router } from 'express';
import { GiveController } from './give.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateCurrencyDto, CreateGivingAreaDto } from './give.dto';

const giveRouter = Router();
const giveController = new GiveController();

giveRouter.get(
  '/',
  authorizationMiddleware("get.give"),
  giveController.find.bind(giveController)
);

giveRouter.put(
  '/:id',
  authorizationMiddleware("update.give"),
  giveController.update.bind(giveController)
);

// Currencies
giveRouter.get(
  '/currencies',
  authorizationMiddleware("get.give"),
  giveController.allCurrencies.bind(giveController)
);

giveRouter.post(
  '/currencies',
  authorizationMiddleware("create.give"),
  validationMiddleware(CreateCurrencyDto),
  giveController.createCurrency.bind(giveController)
);

giveRouter.put(
  '/currencies/:id',
  authorizationMiddleware("update.give"),
  validationMiddleware(CreateCurrencyDto),
  giveController.updateCurrency.bind(giveController)
);

giveRouter.delete(
  '/currencies/:id',
  authorizationMiddleware("delete.give"),
  giveController.deleteCurrency.bind(giveController)
);

// Giving Areas
giveRouter.get(
  '/giving-areas',
  authorizationMiddleware("get.give"),
  giveController.allGivingAreas.bind(giveController)
);

giveRouter.post(
  'giving-areas',
  authorizationMiddleware("create.give"),
  validationMiddleware(CreateGivingAreaDto),
  giveController.createGivingArea.bind(giveController)
);

giveRouter.put(
  '/giving-areas/:id',
  authorizationMiddleware("update.give"),
  validationMiddleware(CreateGivingAreaDto),
  giveController.updateGivingArea.bind(giveController)
);

giveRouter.delete(
  '/giving-areas/:id',
  authorizationMiddleware("delete.give"),
  giveController.deleteGivingArea.bind(giveController)
);

export default giveRouter;
