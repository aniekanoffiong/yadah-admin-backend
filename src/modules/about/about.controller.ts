import { Request, Response, NextFunction } from 'express';
import { AboutService } from './about.service';
import { CreateAboutDto, StoryStatCreateDto, ValueItemCreateDto } from './about.dto';
import { About } from './about.entity';

export class AboutController {
  private aboutService: AboutService;

  constructor(aboutService?: AboutService) {
    this.aboutService = aboutService || new AboutService();
  }

  getById = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.aboutService.find();
      res.json({ data: [this.toAboutDto(about)] });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateAboutDto;
      const about = await this.aboutService.update(dto);
      res.json({ data: this.toAboutDto(about) });
    } catch (error) {
      next(error);
    }
  };

  // StoryStat
  allStoryStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.aboutService.findAllStoryStats();
      res.json({ data: about });
    } catch (error) {
      next(error);
    }
  };

  createStoryStat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as StoryStatCreateDto;
      const storyStat = await this.aboutService.createStoryStat(dto);
      res.json({ data: storyStat });
    } catch (error) {
      next(error);
    }
  };

  updateStoryStat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as StoryStatCreateDto;
      const storyStat = await this.aboutService.updateStoryStat(id, dto);
      res.json({ data: storyStat });
    } catch (error) {
      next(error);
    }
  };

  deleteStoryStat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.aboutService.deleteStoryStat(id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

  // Value Item
  allValueItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const about = await this.aboutService.findAllValueItems();
      res.json({ data: about });
    } catch (error) {
      next(error);
    }
  };

  createValueItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as ValueItemCreateDto;
      const valueItem = await this.aboutService.createValueItem(dto);
      res.json({ data: valueItem });
    } catch (error) {
      next(error);
    }
  };

  updateValueItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as ValueItemCreateDto;
      const valueItem = await this.aboutService.updateValueItem(id, dto);
      res.json({ data: valueItem });
    } catch (error) {
      next(error);
    }
  };

  deleteValueItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.aboutService.deleteValueItem(id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

  private toAboutDto(about: About) {
    return {
      id: about.id,
      mainTitle: about.mainTitle,
      highlightedTitle: about.highlightedTitle,
      description: about.description,
      storyTitle: about.story?.title,
      storyContent: about.story?.content,
      valuesTitle: about.values?.title,
      valuesSubtitle: about.values?.subtitle,
    };
  }
}
