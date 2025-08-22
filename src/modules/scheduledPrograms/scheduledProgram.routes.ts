import { Router } from 'express';
import { ScheduledProgramController } from './scheduledProgram.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const scheduledProgramRouter = Router();
const scheduledProgramController = new ScheduledProgramController();

scheduledProgramRouter.get('/', authorizationMiddleware('get.scheduledProgram'), scheduledProgramController.getAll.bind(scheduledProgramController));
scheduledProgramRouter.get('/:id', authorizationMiddleware('get.scheduledProgram'), scheduledProgramController.getById.bind(scheduledProgramController));
scheduledProgramRouter.post('/', authorizationMiddleware('create.scheduledProgram'), scheduledProgramController.create.bind(scheduledProgramController));
scheduledProgramRouter.put('/:id', authorizationMiddleware('update.scheduledProgram'), scheduledProgramController.update.bind(scheduledProgramController));
scheduledProgramRouter.delete('/:id', authorizationMiddleware('delete.scheduledProgram'), scheduledProgramController.remove.bind(scheduledProgramController));

export { scheduledProgramRouter };
