import { ObjectId } from 'typeorm';

export class TwoFactorModel {
  constructor(
    public _id: ObjectId,
    public tempSessionToken: string,
    public code: string,
    public expireAt: Date,
    public userId: ObjectId,
    public hashPassword: string | null,
  ) {}
}
