import { Request, Response, NextFunction } from 'express';
import { MinistryService } from './ministry.service';
import { CreateMinistryDto } from './ministry.dto';
import { Ministry } from './ministry.entity';

export class MinistryController {
  private ministryService: MinistryService;

  constructor(ministryService?: MinistryService) {
    this.ministryService = ministryService || new MinistryService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ministries = await this.ministryService.findAll();
      res.json({ data: ministries.map(min => this.toDto(min)) });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const ministry = await this.ministryService.findOne(id);
      res.json({ data: this.toDto(ministry) });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateMinistryDto;
      const ministry = await this.ministryService.create(dto);
      res.status(201).json(this.toDto(ministry));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateMinistryDto;
      const ministry = await this.ministryService.update(id, dto);
      res.json({ data: this.toDto(ministry) });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.ministryService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private toDto(ministry: Ministry) {
    return {
      id: ministry.id,
      icon: ministry.icon,
      title: ministry.title,
      description: ministry.description,
      meetingTime: ministry.meetingTime,
      location: ministry.location,
      leader: ministry.leader,
      activities: ministry.activities?.map((a: any) => ({
        activityName: a.activityName,
      })),
    };
  }
}
