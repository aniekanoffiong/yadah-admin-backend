import { Router } from 'express';
import { ConfigFieldController } from './config.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateConfigEntityDto, CreateConfigFieldDto, UpdateConfigEntityDto } from './config.dto';

const configEntityRouter = Router();
const configFieldController = new ConfigFieldController();

// Config Entity
configEntityRouter.get(
  '/', 
  authorizationMiddleware('get.config'), 
  configFieldController.getAll.bind(configFieldController)
);

configEntityRouter.get(
  '/entity/:entityName', 
  authorizationMiddleware('getEntity.config'), 
  configFieldController.getByEntity.bind(configFieldController)
);

configEntityRouter.get(
  '/:entityName/metadata', 
  authorizationMiddleware('getEntity.config'), 
  configFieldController.getEntityConfiguration.bind(configFieldController)
);

configEntityRouter.get(
  '/:id',
  authorizationMiddleware('get.config'), 
  configFieldController.getById.bind(configFieldController)
);

configEntityRouter.post(
  '/', 
  authorizationMiddleware('create.config'), 
  validationMiddleware(CreateConfigEntityDto),
  configFieldController.createEntity.bind(configFieldController)
);

configEntityRouter.put(
  '/:id', 
  authorizationMiddleware('update.config'),
  validationMiddleware(UpdateConfigEntityDto),
  configFieldController.update.bind(configFieldController)
);

configEntityRouter.delete(
  '/:id', 
  authorizationMiddleware('delete.config'), 
  configFieldController.remove.bind(configFieldController)
);

// Config Entity Fields
configEntityRouter.post(
  '/:id/fields', 
  authorizationMiddleware('create.config'), 
  validationMiddleware(CreateConfigFieldDto),
  configFieldController.createField.bind(configFieldController)
);

configEntityRouter.put(
  '/:id/fields/:fieldId', 
  authorizationMiddleware('update.config'),
  validationMiddleware(CreateConfigFieldDto),
  configFieldController.updateField.bind(configFieldController)
);

configEntityRouter.delete(
  '/:id/fields/:fieldId', 
  authorizationMiddleware('delete.config'), 
  configFieldController.removeField.bind(configFieldController)
);

export { configEntityRouter };
