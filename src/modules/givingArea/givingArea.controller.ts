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
      res.json(tags);
    } catch (error) {
      next(error);
    }
  };

  getTagById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const tag = await this.givingAreaService.findGivingAreaById(id);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  };

  createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGivingAreaDto;
      const tag = await this.givingAreaService.createGivingArea(dto);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  };

  updateTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGivingAreaDto;
      const tag = await this.givingAreaService.updateGivingArea(id, dto);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  };

  deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.givingAreaService.deleteGivingArea(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
