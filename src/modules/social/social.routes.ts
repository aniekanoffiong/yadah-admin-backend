import { Router } from 'express';
import { SocialLinkController } from './social.controller';

const socialLinkRouter = Router();
const socialLinkController = new SocialLinkController();

socialLinkRouter.get('/', socialLinkController.getAll);
socialLinkRouter.get('/:id', socialLinkController.getById);
socialLinkRouter.post('/', socialLinkController.create);
socialLinkRouter.put('/:id', socialLinkController.update);
socialLinkRouter.delete('/:id', socialLinkController.remove);

export { socialLinkRouter };
