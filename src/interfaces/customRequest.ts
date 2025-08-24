import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/entities/user.entity';

export interface CustomRequest extends Request {
  cookies: { [key: string]: any };
  token?: JwtPayload;
  user?: User;
}
