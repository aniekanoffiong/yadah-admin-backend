import { Router } from 'express';
import { GalleryController } from './gallery.controller';

const galleryRouter = Router();
const galleryController = new GalleryController();

galleryRouter.get('/items', galleryController.getAllItems);
galleryRouter.get('/items/:id', galleryController.getItemById);
galleryRouter.post('/items', galleryController.createItem);
galleryRouter.put('/items/:id', galleryController.updateItem);
galleryRouter.delete('/items/:id', galleryController.deleteItem);

export { galleryRouter };
