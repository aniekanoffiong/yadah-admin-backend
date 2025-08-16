import { Request, Response, NextFunction } from 'express';
import { GrowInFaithService } from './growInFaith.service';
import { CreateGrowInFaithDto } from './growInFaith.dto';

export class GrowInFaithController {
  private service: GrowInFaithService;

  constructor(service?: GrowInFaithService) {
    this.service = service || new GrowInFaithService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.service.findAll();
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.findOne(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGrowInFaithDto;
      const result = await this.service.create(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGrowInFaithDto;
      const result = await this.service.update(id, dto);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
