import { Request, Response, NextFunction } from 'express';
import { CreateScheduledProgramDto, ScheduledProgramDto } from './scheduledProgram.dto';
import { ScheduledProgramService } from './scheduledProgram.service';
import { ScheduledProgram } from './scheduledProgram.entity';

export class ScheduledProgramController {
  private scheduledProgramService: ScheduledProgramService;

  constructor(scheduledProgramService?: ScheduledProgramService) {
    this.scheduledProgramService = scheduledProgramService || new ScheduledProgramService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const scheduledPrograms = await this.scheduledProgramService.findAll();
      res.json({ data: scheduledPrograms.map(this.toDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const scheduledProgram = await this.scheduledProgramService.findById(id);
      if (scheduledProgram) {
        res.json({ data: this.toDto(scheduledProgram) });
        return;
      }
      res.status(404).json({ message: 'Scheduled Program not found' });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateScheduledProgramDto;
      const scheduledProgram = await this.scheduledProgramService.create(dto);
      res.status(201).json({ data: this.toDto(scheduledProgram) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as Partial<ScheduledProgramDto>;
      const scheduledProgram = await this.scheduledProgramService.update(id, dto);
      if (scheduledProgram) {
        res.json({ data: this.toDto(scheduledProgram) });
        return;
      }
      res.status(404).json({ message: 'Scheduled Program not found' });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.scheduledProgramService.remove(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private toDto(entity: ScheduledProgram): ScheduledProgramDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      scheduledDay: entity.scheduledDay,
      additionalTimes: entity.additionalTimes?.split(",") || [],
      startTime: entity.startTime,
      endTime: entity.endTime,
      location: entity.location,
      icon: entity.icon,
      image: entity.image,
    };
  }
}
