import { Router } from 'express';
import { AboutController } from './about.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const aboutRouter = Router();
const aboutController = new AboutController();

aboutRouter.get('/', authorizationMiddleware('get.about'), aboutController.getById.bind(aboutController));
aboutRouter.put('/:id', authorizationMiddleware('update.about'), aboutController.update.bind(aboutController));
export { aboutRouter };
