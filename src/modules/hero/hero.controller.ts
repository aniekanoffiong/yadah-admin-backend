import { Request, Response, NextFunction } from 'express';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './hero.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class HeroController {
  private heroService: HeroService;

  constructor(heroService?: HeroService) {
    this.heroService = heroService || new HeroService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const heroes = await this.heroService.findAll();
      res.json(heroes.map(h => this.toDto(h)));
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const hero = await this.heroService.findOne(id);
      res.json(this.toDto(hero));
    } catch (error) {
      next(error);
    }
  };

  getByPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = req.params.page;
      const hero = await this.heroService.findByPage(page);
      if (!hero) {
        res.status(404).json({ message: 'Hero not found for page' });
        return;
      }
      res.json(this.toDto(hero));
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateHeroDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const newHero = await this.heroService.create(dto);
      res.status(201).json(this.toDto(newHero));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = plainToClass(CreateHeroDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const updatedHero = await this.heroService.update(id, dto);
      res.json(this.toDto(updatedHero));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.heroService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private toDto(hero: any) {
    return {
      id: hero.id,
      page: hero.page,
      backgroundImage: hero.backgroundImage,
      title: hero.title,
      subtitle: hero.subtitle,
      showControls: hero.showControls,
      volunteerProgramText: hero.volunteerProgramText,
      volunteerProgramLink: hero.volunteerProgramLink,
    };
  }
}
