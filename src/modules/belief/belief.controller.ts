import { Request, Response, NextFunction } from 'express';
import { BeliefService } from './belief.service';
import { CreateBeliefDto } from './belief.dto';

export class BeliefController {
  private beliefService: BeliefService;

  constructor(beliefService?: BeliefService) {
    this.beliefService = beliefService || new BeliefService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const beliefs = await this.beliefService.findAll();
      res.json({ data: beliefs });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const belief = await this.beliefService.findOne(id);
      res.json({ data: belief });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateBeliefDto;
      const belief = await this.beliefService.create(dto);
      res.status(201).json({ data: belief });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateBeliefDto;
      const belief = await this.beliefService.update(id, dto);
      res.json({ data: belief });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.beliefService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
