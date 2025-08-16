import { Router } from 'express';
import { ItemTagController } from './itemTag.controller';

const itemTagRouter = Router();
const itemTagController = new ItemTagController();

// Item Tags
itemTagRouter.get('/', itemTagController.getAllTags);
itemTagRouter.get('/:id', itemTagController.getTagById);
itemTagRouter.post('/', itemTagController.createTag);
itemTagRouter.put('/:id', itemTagController.updateTag);
itemTagRouter.delete('/:id', itemTagController.deleteTag);

export { itemTagRouter };
