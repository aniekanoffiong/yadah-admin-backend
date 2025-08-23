import { Router } from 'express';
import { LiveController } from './live.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const liveRouter = Router();
const liveController = new LiveController();

liveRouter.get('/', authorizationMiddleware("get.live"), liveController.getAll.bind(liveController));
liveRouter.get('/:id', authorizationMiddleware("get.live"), liveController.getById.bind(liveController));
liveRouter.post('/', authorizationMiddleware("create.live"), liveController.create.bind(liveController));
liveRouter.put('/:id', authorizationMiddleware("update.live"), liveController.update.bind(liveController));
liveRouter.delete('/:id', authorizationMiddleware("delete.live"), liveController.delete.bind(liveController));

export default liveRouter;
