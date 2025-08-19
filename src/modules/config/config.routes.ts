import { Router } from 'express';
import { ConfigFieldController } from './config.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const configFieldRouter = Router();
const configFieldController = new ConfigFieldController();

configFieldRouter.get('/', authorizationMiddleware('get.config'), configFieldController.getAll.bind(configFieldController));
configFieldRouter.get('/entity/:entityName', authorizationMiddleware('getEntity.config'), configFieldController.getByEntity.bind(configFieldController));
configFieldRouter.get('/:id', authorizationMiddleware('get.config'), configFieldController.getById.bind(configFieldController));
configFieldRouter.post('/', authorizationMiddleware('create.config'), configFieldController.create.bind(configFieldController));
configFieldRouter.put('/:id', authorizationMiddleware('update.config'), configFieldController.update.bind(configFieldController));
configFieldRouter.delete('/:id', authorizationMiddleware('delete.config'), configFieldController.remove.bind(configFieldController));

export { configFieldRouter };
