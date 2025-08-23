import { Request, Response, NextFunction } from 'express';
import { ItemTagService } from './itemTag.service';
import { CreateItemTagDto } from './itemTag.dto';

export class ItemTagController {
  private itemTagService: ItemTagService;

  constructor(itemTagService?: ItemTagService) {
    this.itemTagService = itemTagService || new ItemTagService();
  }

  getAllTags = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.itemTagService.findAllTags();
      res.json({ data: tags });
    } catch (error) {
      next(error);
    }
  };

  getTagById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const tag = await this.itemTagService.findTagById(id);
      res.json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateItemTagDto;
      const tag = await this.itemTagService.createTag(dto);
      res.status(201).json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  updateTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateItemTagDto;
      const tag = await this.itemTagService.updateTag(id, dto);
      res.json({ data: tag });
    } catch (error) {
      next(error);
    }
  };

  deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.itemTagService.deleteTag(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
