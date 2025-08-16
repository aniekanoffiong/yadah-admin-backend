import { Request, Response, NextFunction } from 'express';
import { CallToActionService } from './cta.service';
import { CreateCallToActionDto } from './cta.dto';

export class CallToActionController {
  private ctaService: CallToActionService;

  constructor(ctaService?: CallToActionService) {
    this.ctaService = ctaService || new CallToActionService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ctAs = await this.ctaService.findAll();
      res.json(ctAs);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const cta = await this.ctaService.findOne(id);
      res.json(cta);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateCallToActionDto;
      const cta = await this.ctaService.create(dto);
      res.status(201).json(cta);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateCallToActionDto;
      const cta = await this.ctaService.update(id, dto);
      res.json(cta);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.ctaService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
