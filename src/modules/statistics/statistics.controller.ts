import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from './statistics.service';
import { CreateStatisticsDto } from './statistics.dto';

export class StatisticsController {
  private statisticsService: StatisticsService;

  constructor(statisticsService?: StatisticsService) {
    this.statisticsService = statisticsService || new StatisticsService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.statisticsService.findAll();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const stats = await this.statisticsService.findOne(id);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateStatisticsDto;
      const stats = await this.statisticsService.create(dto);
      res.status(201).json(stats);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateStatisticsDto;
      const stats = await this.statisticsService.update(id, dto);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.statisticsService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
