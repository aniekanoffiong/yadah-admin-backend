import { Router } from 'express';
import { ScheduledProgramController } from './scheduledProgram.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateScheduledProgramDto } from './scheduledProgram.dto';

const scheduledProgramRouter = Router();
const scheduledProgramController = new ScheduledProgramController();

scheduledProgramRouter.get(
  '/',
  authorizationMiddleware('get.scheduledProgram'),
  scheduledProgramController.getAll.bind(scheduledProgramController)
);

scheduledProgramRouter.get(
  '/:id',
  authorizationMiddleware('get.scheduledProgram'),
  scheduledProgramController.getById.bind(scheduledProgramController)
);

scheduledProgramRouter.post(
  '/',
  authorizationMiddleware('create.scheduledProgram'),
  validationMiddleware(CreateScheduledProgramDto),
  scheduledProgramController.create.bind(scheduledProgramController)
);

scheduledProgramRouter.put(
  '/:id',
  authorizationMiddleware('update.scheduledProgram'),
  validationMiddleware(CreateScheduledProgramDto),
  scheduledProgramController.update.bind(scheduledProgramController)
);

scheduledProgramRouter.delete(
  '/:id',
  authorizationMiddleware('delete.scheduledProgram'),
  scheduledProgramController.remove.bind(scheduledProgramController)
);

export { scheduledProgramRouter };
