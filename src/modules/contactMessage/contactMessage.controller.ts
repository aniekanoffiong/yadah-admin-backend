import { Request, Response, NextFunction } from 'express';
import { ContactMessageService } from './contactMessage.service';

export class ContactMessageController {
  private service: ContactMessageService;

  constructor(service?: ContactMessageService) {
    this.service = service || new ContactMessageService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.service.create(req.body);
      res.status(201).json({ data: message });
    } catch (err) {
      next(err);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.service.findAll();
      res.json({ data: messages });
    } catch (err) {
      next(err);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.service.findById(Number(req.params.id));
      if (!message) return res.status(404).json({ message: 'Not found' });
      res.json({ data: message });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
