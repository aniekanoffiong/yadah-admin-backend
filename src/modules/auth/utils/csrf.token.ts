import { Response } from 'express';

export function setResponseCookie(res: Response, cookieName: string, value: string, httpOnly: boolean = true) {
  res.cookie(cookieName, value, {
    httpOnly,
    secure: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
    domain: process.env.NODE_ENV === 'production' ? `.${process.env.ROOT_DOMAIN}` : undefined,
    maxAge: Number(process.env.COOKIE_VALIDITY),
  });
}

export function clearCookie(res: Response, cookieName: string, httpOnly: boolean = true) {
  res.clearCookie(cookieName, {
    httpOnly,
    secure: true,    
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
  });
}