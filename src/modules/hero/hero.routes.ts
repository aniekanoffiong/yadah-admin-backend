import { Router } from 'express';
import { HeroController } from './hero.controller';

const heroRouter = Router();
const heroController = new HeroController();

heroRouter.get('/', heroController.getAll);
heroRouter.get('/:id', heroController.getById);
heroRouter.get('/page/:page', heroController.getByPage);
heroRouter.post('/', heroController.create);
heroRouter.put('/:id', heroController.update);
heroRouter.delete('/:id', heroController.remove);

export { heroRouter };
