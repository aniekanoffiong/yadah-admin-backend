import { Request, Response, NextFunction } from 'express';
import { AboutService } from './about.service';
import { CreateAboutDto } from './about.dto';

export class AboutController {
  private aboutService: AboutService;

  constructor(aboutService?: AboutService) {
    this.aboutService = aboutService || new AboutService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const abouts = await this.aboutService.findAll();
      res.json(abouts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const about = await this.aboutService.findOne(id);
      res.json(about);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateAboutDto;
      const about = await this.aboutService.create(dto);
      res.status(201).json(about);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateAboutDto;
      const about = await this.aboutService.update(id, dto);
      res.json(about);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.aboutService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
