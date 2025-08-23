import { Request, Response, NextFunction } from 'express';
import { SiteLinkService } from './siteLink.service';
import { CreateSiteLinkDto } from './siteLink.dto';

export class SiteLinkController {
  private siteLinkService: SiteLinkService;

  constructor(siteLinkService?: SiteLinkService) {
    this.siteLinkService = siteLinkService || new SiteLinkService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const siteLinks = await this.siteLinkService.findAll();
      res.json({ data: siteLinks });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const siteLink = await this.siteLinkService.findOne(id);
      res.json({ data: siteLink });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateSiteLinkDto;
      const siteLink = await this.siteLinkService.create(dto);
      res.status(201).json({ data: siteLink });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateSiteLinkDto;
      const siteLink = await this.siteLinkService.update(id, dto);
      res.json({ data: siteLink });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.siteLinkService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
