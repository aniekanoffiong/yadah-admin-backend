import { Request, Response, NextFunction } from 'express';
import { PastorService } from './pastor.service';
import { CreatePastorDto } from './pastor.dto';
import { validateEntity } from '../../utils/validate';

export class PastorController {
  private pastorService: PastorService;

  constructor(pastorService?: PastorService) {
    this.pastorService = pastorService || new PastorService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pastors = await this.pastorService.findAll();
      res.json({ data: pastors });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const pastor = await this.pastorService.findOne(id);
      res.json({ data: pastor });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreatePastorDto;
      const pastor = await this.pastorService.create(dto);
      res.status(201).json({ data: pastor });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreatePastorDto;
      const pastor = await this.pastorService.update(id, dto);
      res.json({ data: pastor });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.pastorService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
