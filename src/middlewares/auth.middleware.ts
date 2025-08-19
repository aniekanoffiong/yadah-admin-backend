import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from '../interfaces/customRequest';
import { isTokenRevoked } from '../modules/auth/utils/tokenBlacklist';
import AuthorizationFailedException from '../exceptions/authorizationFailed.exception';

dotenv.config();

const COOKIE_NAME = 'session_token';

export async function authenticationMiddleware(req: CustomRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      throw new AuthorizationFailedException()
    }

    const revoked = await isTokenRevoked(token);
    if (revoked) {
      throw new AuthorizationFailedException();
    }

    const secret = process.env.JWT_SECRET_KEY!;
    const payload = jwt.verify(token, secret) as JwtPayload;
    
    req.token = payload;
    next();
  } catch (error) {
    next(error);
  }
};
