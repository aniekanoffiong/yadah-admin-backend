import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import dotenv from "dotenv";
import { clearCookie, setResponseCookie } from './utils/csrf.token';
import { revokeToken } from './utils/tokenBlacklist';
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from '../../interfaces/customRequest';
import { randomBytes } from 'crypto';
import { LoginHistoryService } from '../loginHistory/loginHistory.service';

dotenv.config();

export class AuthController {
  private authService: AuthService;
  private loginHistoryService: LoginHistoryService;

  constructor(authService?: AuthService) {
    this.authService = authService || new AuthService()
    this.loginHistoryService = new LoginHistoryService()
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ data: this.toDto(user) });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user, token } = await this.authService.login(req.body);
      this.loginHistoryService.create(req, user);
      // Set Auth Cookie
      setResponseCookie(
        res,
        process.env.COOKIE_NAME!,
        token,
      )
      // Set CSRF Cookie
      setResponseCookie(
        res,
        process.env.CSRF_TOKEN_NAME!,
        randomBytes(24).toString('hex'),
        false
      )
      res.status(200).json({ data: this.toDto(user, token) });
    } catch (err) {
      next(err);
    }
  }

  authUser = async (req: CustomRequest, res: Response): Promise<void> => {
    const user = req.user
    res.json({ data: this.toDto(user!) })
  }

  // Not currently used, but kept for future reference
  // async twoFactor(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const user = await this.authService.twoFactorAuth(req.body, req.params);
  //     res.status(200).json(this.toDto(user));
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async logout(req: Request, res: Response) {
    const token = req.cookies[process.env.COOKIE_NAME!];
    if (token) {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded || !decoded.exp) {
        return res.status(400).json({ message: 'Invalid token' });
      }
      const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresInSeconds > 0) {
        await revokeToken(token, expiresInSeconds);
      }
      clearCookie(res, process.env.COOKIE_NAME!)
      clearCookie(res, process.env.CSRF_TOKEN_NAME!, false)
    }
    res.json({ message: 'Logged out' });
  }

  private toDto(userEntity: User, token?: string) {
    const user = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.userRole()?.name,
      isActive: userEntity.isActive,
    }
    return token ? { user, token }: user
  }
};
