import { Router } from 'express';
import { GalleryController } from './gallery.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const galleryRouter = Router();
const galleryController = new GalleryController();

galleryRouter.get('/items', authorizationMiddleware('get.gallery'), galleryController.getAllItems.bind(galleryController));
galleryRouter.get('/items/:id', authorizationMiddleware('get.gallery'), galleryController.getItemById.bind(galleryController));
galleryRouter.post('/items', authorizationMiddleware('create.gallery'), galleryController.createItem.bind(galleryController));
galleryRouter.put('/items/:id', authorizationMiddleware('update.gallery'), galleryController.updateItem.bind(galleryController));
galleryRouter.delete('/items/:id', authorizationMiddleware('delete.gallery'), galleryController.deleteItem.bind(galleryController));

export { galleryRouter };
