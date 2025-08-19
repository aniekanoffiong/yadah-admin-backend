import { Router } from 'express';
import { HeroController } from './hero.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const heroRouter = Router();
const heroController = new HeroController();

heroRouter.get('/', authorizationMiddleware('get.hero'), heroController.getAll.bind(heroController));
heroRouter.get('/:id', authorizationMiddleware('get.hero'), heroController.getById.bind(heroController));
heroRouter.get('/page/:page', authorizationMiddleware('get.hero'), heroController.getByPage.bind(heroController));
heroRouter.post('/', authorizationMiddleware('create.hero'), heroController.create.bind(heroController));
heroRouter.put('/:id', authorizationMiddleware('update.hero'), heroController.update.bind(heroController));
heroRouter.delete('/:id', authorizationMiddleware('delete.hero'), heroController.remove.bind(heroController));

export { heroRouter };
