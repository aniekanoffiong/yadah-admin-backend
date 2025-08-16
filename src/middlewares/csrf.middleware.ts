import { Request, Response, NextFunction } from 'express';

export function csrfProtectionMiddleware(req: Request, res: Response, next: NextFunction) {
  const csrfCookie = req.cookies[process.env.CSRF_TOKEN_NAME!];
  const csrfHeader = req.headers['x-csrf-token'] as string;

  if (!csrfCookie || !csrfHeader) {
    return res.status(403).json({ message: 'CSRF token missing' });
  }

  if (csrfCookie !== csrfHeader) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }

  next();
}
