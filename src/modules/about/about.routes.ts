import { Router } from 'express';
import { AboutController } from './about.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const aboutRouter = Router();
const aboutController = new AboutController();

aboutRouter.get('/', authorizationMiddleware('get.about'), aboutController.getAll.bind(aboutController));
aboutRouter.get('/:id', authorizationMiddleware('get.about'), aboutController.getById.bind(aboutController));
aboutRouter.post('/', authorizationMiddleware('create.about'), aboutController.create.bind(aboutController));
aboutRouter.put('/:id', authorizationMiddleware('update.about'), aboutController.update.bind(aboutController));
aboutRouter.delete('/:id', authorizationMiddleware('delete.about'), aboutController.remove.bind(aboutController));

export { aboutRouter };
