import { Router } from 'express';
import { SermonController } from './sermon.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const sermonRouter = Router();
const sermonController = new SermonController();

sermonRouter.get('/', authorizationMiddleware('get.sermon'), sermonController.getAllSermons.bind(sermonController));
sermonRouter.get('/:id', authorizationMiddleware('get.sermon'), sermonController.getSermonById.bind(sermonController));
sermonRouter.post('/', authorizationMiddleware('create.sermon'), sermonController.createSermon.bind(sermonController));
sermonRouter.put('/:id', authorizationMiddleware('update.sermon'), sermonController.updateSermon.bind(sermonController));
sermonRouter.delete('/:id', authorizationMiddleware('delete.sermon'), sermonController.deleteSermon.bind(sermonController));

export { sermonRouter };
