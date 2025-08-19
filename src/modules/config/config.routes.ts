import { Router } from 'express';
import { ConfigFieldController } from './config.controller';

const configFieldRouter = Router();
const configFieldController = new ConfigFieldController();

configFieldRouter.get('/', configFieldController.getAll);
configFieldRouter.get('/entity/:entityName', configFieldController.getByEntity);
configFieldRouter.get('/:id', configFieldController.getById);
configFieldRouter.post('/', configFieldController.create);
configFieldRouter.put('/:id', configFieldController.update);
configFieldRouter.delete('/:id', configFieldController.remove);

export { configFieldRouter };
