import { Router } from 'express';
import { AboutController } from './about.controller';

const aboutRouter = Router();
const aboutController = new AboutController();

aboutRouter.get('/', aboutController.getAll);
aboutRouter.get('/:id', aboutController.getById);
aboutRouter.post('/', aboutController.create);
aboutRouter.put('/:id', aboutController.update);
aboutRouter.delete('/:id', aboutController.remove);

export { aboutRouter };
