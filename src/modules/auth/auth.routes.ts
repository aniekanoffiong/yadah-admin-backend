import { Router } from 'express';
import { AuthController } from './auth.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/register',
  validationMiddleware(RegisterDto),
  authController.register.bind(authController)
);

authRouter.post(
  '/login',
  validationMiddleware(LoginDto),
  authController.login.bind(authController)
);

authRouter.post(
  '/logout',
  authController.logout.bind(authController)
);
export { authRouter };
