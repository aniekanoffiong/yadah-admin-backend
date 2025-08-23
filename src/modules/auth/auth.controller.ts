import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import dotenv from "dotenv";
import { setCsrfCookie } from './utils/csrf.token';
import { revokeToken } from './utils/tokenBlacklist';
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from '../../interfaces/customRequest';

dotenv.config();

export class AuthController {
  private authService: AuthService;

  constructor(authService?: AuthService) {
    this.authService = authService || new AuthService()
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(this.toDto(user));
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user, token } = await this.authService.login(req.body);
      res.cookie(process.env.COOKIE_NAME!, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Number(process.env.JWT_VALIDITY),
      });
      setCsrfCookie(res);
      res.status(200).json(this.toDto(user, token));
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
      res.clearCookie(process.env.COOKIE_NAME!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
    res.json({ message: 'Logged out' });
  }

  private toDto(user: User, token?: string) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      token,
    }
  }
};
