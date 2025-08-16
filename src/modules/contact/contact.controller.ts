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
      const infos = await this.contactInfoService.findAll();
      res.json(infos);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const info = await this.contactInfoService.findOne(id);
      res.json(info);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateContactInfoDto;
      const info = await this.contactInfoService.create(dto);
      res.status(201).json(info);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateContactInfoDto;
      const info = await this.contactInfoService.update(id, dto);
      res.json(info);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.contactInfoService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
