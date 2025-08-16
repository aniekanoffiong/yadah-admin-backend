import { Router } from 'express';
import { SermonController } from './sermon.controller';

const sermonRouter = Router();
const sermonController = new SermonController();

sermonRouter.get('/', sermonController.getAllSermons);
sermonRouter.get('/:id', sermonController.getSermonById);
sermonRouter.post('/', sermonController.createSermon);
sermonRouter.put('/:id', sermonController.updateSermon);
sermonRouter.delete('/:id', sermonController.deleteSermon);

export { sermonRouter };
