import { Request, Response, NextFunction } from 'express';
import { SermonService } from './sermon.service';
import { CreateSermonDto } from './sermon.dto';

export class SermonController {
  private sermonService: SermonService;

  constructor(sermonService?: SermonService) {
    this.sermonService = sermonService || new SermonService();
  }

  getAllSermons = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sermons = await this.sermonService.findAllSermons();
      res.json({ data: sermons });
    } catch (error) {
      next(error);
    }
  };

  getSermonById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const sermon = await this.sermonService.findOneSermon(id);
      res.json({ data: sermon });
    } catch (error) {
      next(error);
    }
  };

  createSermon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateSermonDto;
      const sermon = await this.sermonService.createSermon(dto);
      res.status(201).json({ data: sermon });
    } catch (error) {
      next(error);
    }
  };

  updateSermon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateSermonDto;
      const sermon = await this.sermonService.updateSermon(id, dto);
      res.json({ data: sermon });
    } catch (error) {
      next(error);
    }
  };

  deleteSermon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.sermonService.deleteSermon(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
