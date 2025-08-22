import { Request, Response, NextFunction } from 'express';
import { AboutService } from './about.service';
import { CreateAboutDto } from './about.dto';

export class AboutController {
  private aboutService: AboutService;

  constructor(aboutService?: AboutService) {
    this.aboutService = aboutService || new AboutService();
  }

  getById = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.aboutService.find();
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
      const dto = req.body as CreateAboutDto;
      const about = await this.aboutService.update(dto);
      res.json(about);
    } catch (error) {
      next(error);
    }
  };
}
