import { Request, Response } from 'express';
import { LoginHistoryService } from './loginHistory.service';

export class LoginHistoryController {
  private loginHistoryService: LoginHistoryService;

  constructor(loginHistoryService?: LoginHistoryService) {
    this.loginHistoryService = loginHistoryService || new LoginHistoryService();
  }

  async getAll(_req: Request, res: Response) {
    try {
      const logins = await this.loginHistoryService.getAll();
      res.json({ data: logins });
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve login records' });
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const login = await this.loginHistoryService.getByUserId(id);
      if (login) {
        res.json({ data: login });
      } else {
        res.status(404).json({ message: 'Login record not found' });
      }
    } catch {
      res.status(400).json({ message: 'Invalid ID' });
    }
  }
}
