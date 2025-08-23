import { Router } from 'express';
import { SermonController } from './sermon.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateSermonDto } from './sermon.dto';

const sermonRouter = Router();
const sermonController = new SermonController();

sermonRouter.get(
  '/',
  authorizationMiddleware('get.sermon'),
  sermonController.getAllSermons.bind(sermonController)
);

sermonRouter.get(
  '/:id',
  authorizationMiddleware('get.sermon'),
  sermonController.getSermonById.bind(sermonController)
);

sermonRouter.post(
  '/',
  authorizationMiddleware('create.sermon'),
  validationMiddleware(CreateSermonDto),
  sermonController.createSermon.bind(sermonController)
);

sermonRouter.put(
  '/:id',
  authorizationMiddleware('update.sermon'),
  validationMiddleware(CreateSermonDto),
  sermonController.updateSermon.bind(sermonController)
);

sermonRouter.delete(
  '/:id',
  authorizationMiddleware('delete.sermon'),
  sermonController.deleteSermon.bind(sermonController)
);

export { sermonRouter };
