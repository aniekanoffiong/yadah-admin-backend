import { Request, Response, NextFunction } from 'express';
import { GivingAreaService } from './givingArea.service';
import { CreateGivingAreaDto } from './givingArea.dto';

export class GivingAreaController {
  private givingAreaService: GivingAreaService;

  constructor(givingAreaService?: GivingAreaService) {
    this.givingAreaService = givingAreaService || new GivingAreaService();
  }

  getAllTags = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.givingAreaService.findAllGivingAreas();
      res.json({ data: tags });
    } catch (error) {
      next(error);
    }
  };

  getTagById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const tag = await this.givingAreaService.findGivingAreaById(id);
      res.json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGivingAreaDto;
      const tag = await this.givingAreaService.createGivingArea(dto);
      res.status(201).json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  updateTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGivingAreaDto;
      const tag = await this.givingAreaService.updateGivingArea(id, dto);
      res.json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.givingAreaService.deleteGivingArea(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
