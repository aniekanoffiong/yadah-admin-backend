import { Request, Response, NextFunction } from 'express';
import { ContactInfoService } from './contact.service';
import { CreateContactInfoDto } from './contact.dto';

export class ContactInfoController {
  private contactInfoService: ContactInfoService;

  constructor(contactInfoService?: ContactInfoService) {
    this.contactInfoService = contactInfoService || new ContactInfoService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const infos = await this.contactInfoService.find();
      res.json({ data: [infos] });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateContactInfoDto;
      const info = await this.contactInfoService.create(dto);
      res.status(201).json({ data: info });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateContactInfoDto;
      const info = await this.contactInfoService.update(dto);
      res.json({ data: info });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.contactInfoService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
