import { Router } from 'express';
import { ItemTagController } from './itemTag.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateItemTagDto } from './itemTag.dto';

const itemTagRouter = Router();
const itemTagController = new ItemTagController();

// Item Tags
itemTagRouter.get(
  '/',
  authorizationMiddleware('get.itemTag'),
  itemTagController.getAllTags.bind(itemTagController)
);

itemTagRouter.get(
  '/:id',
  authorizationMiddleware('get.itemTag'),
  itemTagController.getTagById.bind(itemTagController)
);

itemTagRouter.post(
  '/',
  authorizationMiddleware('create.itemTag'),
  validationMiddleware(CreateItemTagDto),
  itemTagController.createTag.bind(itemTagController)
);

itemTagRouter.put(
  '/:id',
  authorizationMiddleware('update.itemTag'),
  validationMiddleware(CreateItemTagDto),
  itemTagController.updateTag.bind(itemTagController)
);

itemTagRouter.delete(
  '/:id',
  authorizationMiddleware('delete.itemTag'),
  itemTagController.deleteTag.bind(itemTagController)
);

export { itemTagRouter };
