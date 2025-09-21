import { Router } from 'express';
import { GalleryController } from './gallery.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateGalleryItemDto } from './gallery.dto';

const galleryRouter = Router();
const galleryController = new GalleryController();

galleryRouter.get(
  '/',
  authorizationMiddleware('get.gallery'),
  galleryController.getAllItems.bind(galleryController)
);

galleryRouter.get(
  '/:id',
  authorizationMiddleware('get.gallery'),
  galleryController.getItemById.bind(galleryController)
);

galleryRouter.post(
  '/',
  authorizationMiddleware('create.gallery'),
  validationMiddleware(CreateGalleryItemDto),
  galleryController.createItem.bind(galleryController)
);

galleryRouter.put(
  '/:id',
  authorizationMiddleware('update.gallery'),
  validationMiddleware(CreateGalleryItemDto),
  galleryController.updateItem.bind(galleryController)
);

galleryRouter.delete(
  '/:id',
  authorizationMiddleware('delete.gallery'),
  galleryController.deleteItem.bind(galleryController)
);

export { galleryRouter };
