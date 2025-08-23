import { Router } from 'express';
import { ConfigFieldController } from './config.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateConfigFieldDto } from './config.dto';

const configFieldRouter = Router();
const configFieldController = new ConfigFieldController();

configFieldRouter.get(
  '/', 
  authorizationMiddleware('get.config'), 
  configFieldController.getAll.bind(configFieldController)
);

configFieldRouter.get(
  '/entity/:entityName', 
  authorizationMiddleware('getEntity.config'), 
  configFieldController.getByEntity.bind(configFieldController)
);

configFieldRouter.get(
  '/:id', 
  authorizationMiddleware('get.config'), 
  configFieldController.getById.bind(configFieldController)
);

configFieldRouter.post(
  '/', 
  authorizationMiddleware('create.config'), 
  validationMiddleware(CreateConfigFieldDto),
  configFieldController.create.bind(configFieldController)
);

configFieldRouter.put(
  '/:id', 
  authorizationMiddleware('update.config'),
  validationMiddleware(CreateConfigFieldDto),
  configFieldController.update.bind(configFieldController)
);

configFieldRouter.delete(
  '/:id', 
  authorizationMiddleware('delete.config'), 
  configFieldController.remove.bind(configFieldController)
);

export { configFieldRouter };
