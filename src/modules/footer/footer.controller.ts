import { Request, Response, NextFunction } from 'express';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './footer.dto';

export class FooterController {
  private footerService: FooterService;

  constructor(footerService?: FooterService) {
    this.footerService = footerService || new FooterService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const footers = await this.footerService.findAll();
      res.json(footers);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const footer = await this.footerService.findOne(id);
      res.json(footer);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateFooterDto;
      const footer = await this.footerService.create(dto);
      res.status(201).json(footer);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateFooterDto;
      const footer = await this.footerService.update(id, dto);
      res.json(footer);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.footerService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
