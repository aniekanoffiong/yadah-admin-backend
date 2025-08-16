import { Router } from 'express';
import { MinistryController } from './ministry.controller';

const ministryRouter = Router();
const ministryController = new MinistryController();

ministryRouter.get('/', ministryController.getAll);
ministryRouter.get('/:id', ministryController.getById);
ministryRouter.post('/', ministryController.create);
ministryRouter.put('/:id', ministryController.update);
ministryRouter.delete('/:id', ministryController.remove);

export { ministryRouter };
