import { Router } from 'express';
import { DropdownListController } from './dropdownList.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const dropdownListRouter = Router();
const dropdownListController = new DropdownListController();

dropdownListRouter.get(
  '/icons',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.getIcons.bind(dropdownListController)
);

dropdownListRouter.get(
  '/social-links',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.socialLinks.bind(dropdownListController)
);

dropdownListRouter.get(
  '/site-links',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.siteLinks.bind(dropdownListController)
);

dropdownListRouter.get(
  '/tags',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.getTags.bind(dropdownListController)
);

dropdownListRouter.get(
  '/icons/social',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.getSocialIcons.bind(dropdownListController)
);

dropdownListRouter.get(
  '/payment-options',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.getEnabledPaymentOptions.bind(dropdownListController)
);

dropdownListRouter.get(
  '/currencies',
  authorizationMiddleware('get.dropdown-list'),
  dropdownListController.getCurrencies.bind(dropdownListController)
);

export { dropdownListRouter };
