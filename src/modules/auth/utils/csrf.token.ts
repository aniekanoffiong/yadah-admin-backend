import { randomBytes } from 'crypto';
import { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function setCsrfCookie(res: Response) {
  const csrfToken = randomBytes(24).toString('hex');
  // Set non-HttpOnly cookie accessible to JS for frontend
  res.cookie(process.env.CSRF_TOKEN_NAME!, csrfToken, {
    httpOnly: false, // allow JS access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000, // 1 hour expiration
  });
  return csrfToken;
}
