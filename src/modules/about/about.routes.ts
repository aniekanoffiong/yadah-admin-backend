import { Router } from 'express';
import { AboutController } from './about.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import { CreateAboutDto, StoryStatCreateDto, ValueItemCreateDto } from './about.dto';
import validationMiddleware from '../../middlewares/validation.middleware';

const aboutRouter = Router();
const aboutController = new AboutController();

aboutRouter.get(
  '/',
  authorizationMiddleware('get.about'),
  aboutController.getById.bind(aboutController)
);

aboutRouter.put(
  '/:id',
  authorizationMiddleware('update.about'),
  validationMiddleware(CreateAboutDto),
  aboutController.update.bind(aboutController)
);

// Story Stat
aboutRouter.get(
  '/story-stats', 
  authorizationMiddleware('get.storyStat'),
  aboutController.allStoryStats.bind(aboutController)
);

aboutRouter.post(
  '/story-stats',
  authorizationMiddleware('create.storyStat'),
  validationMiddleware(StoryStatCreateDto),
  aboutController.createStoryStat.bind(aboutController)
);

aboutRouter.put(
  '/story-stats/:id', 
  authorizationMiddleware('update.storyStat'),
  validationMiddleware(StoryStatCreateDto),
  aboutController.updateStoryStat.bind(aboutController)
);

aboutRouter.delete(
  '/story-stats/:id', 
  authorizationMiddleware('delete.storyStat'),
  aboutController.deleteStoryStat.bind(aboutController)
);

// Value Item
aboutRouter.get(
  '/value-items',
  authorizationMiddleware('get.valueItem'),
  aboutController.allValueItems.bind(aboutController)
);

aboutRouter.post(
  '/value-items',
  authorizationMiddleware('create.valueItem'),
  validationMiddleware(ValueItemCreateDto),
  aboutController.create.bind(aboutController)
);

aboutRouter.put(
  '/value-items/:id',
  authorizationMiddleware('update.valueItem'),
  validationMiddleware(ValueItemCreateDto),
  aboutController.updateValueItem.bind(aboutController)
);

aboutRouter.delete(
  '/value-items/:id',
  authorizationMiddleware('delete.valueItem'),
  aboutController.deleteValueItem.bind(aboutController)
);

export { aboutRouter };
