import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/entities/user.entity';

export interface CustomRequest extends Request {
  token?: JwtPayload;
  user?: User;
}
