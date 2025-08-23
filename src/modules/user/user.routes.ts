import { Router } from 'express';
import { UserController } from './user.controller';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import validationMiddleware from '../../middlewares/validation.middleware';
import { CreateUserDto } from './dtos/user.dto';

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  '/',
  authorizationMiddleware('get.user'),
  userController.getAll.bind(userController)
);

userRouter.get(
  '/:id',
  authorizationMiddleware('get.user'),
  userController.getById.bind(userController)
);

userRouter.post(
  '/',
  authorizationMiddleware('create.user'),
  validationMiddleware(CreateUserDto),
  userController.create.bind(userController)
);

userRouter.put(
  '/:id',
  authorizationMiddleware('update.user'),
  validationMiddleware(CreateUserDto),
  userController.update.bind(userController)
);

userRouter.delete(
  '/:id',
  authorizationMiddleware('delete.user'),
  userController.remove.bind(userController)
);

export { userRouter };
