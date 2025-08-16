import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export { authRouter };
