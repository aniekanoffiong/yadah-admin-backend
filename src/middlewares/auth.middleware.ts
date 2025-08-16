import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from '../interfaces/customRequest';
import InvalidCredentialsException from '../exceptions/invalidCredentials.exception';
import { isTokenRevoked } from '../modules/auth/utils/tokenBlacklist';
import AuthorizationFailedException from '../exceptions/authorizationFailed.exception';

dotenv.config();

const COOKIE_NAME = 'session_token';

export function authenticationMiddleware() {
  return async function (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = req.cookies[COOKIE_NAME];
      if (!token) return res.status(401).json({ message: 'Unauthorized: no session token' });

      try {
        const secret = process.env.JWT_SECRET!;
        const payload = jwt.verify(token, secret) as JwtPayload;
        
        const revoked = await isTokenRevoked(token);
        if (revoked) {
          throw new AuthorizationFailedException();
        }

        req.token = payload;
        next();
      } catch (err) {
        next(new InvalidCredentialsException())
      }
    
      next();
    } catch (error) {
      next(error);
    }
  };
}
