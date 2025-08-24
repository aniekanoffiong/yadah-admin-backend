import { Router } from 'express';
import { LoginHistoryController } from './loginHistory.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';

const loginHistoryRouter = Router();
const loginHistoryController = new LoginHistoryController();

loginHistoryRouter.get('/', authorizationMiddleware("get.login"), loginHistoryController.getAll.bind(loginHistoryController));
loginHistoryRouter.get('/user/:id', authorizationMiddleware("get.userLogin"), loginHistoryController.getByUserId.bind(loginHistoryController));

export default loginHistoryRouter;
