import { Request, Response, NextFunction } from 'express';
import { EventService } from './event.service';
import { CreateEventDto, EventDto } from './event.dto';

export class EventController {
  private eventService: EventService;

  constructor(eventService?: EventService) {
    this.eventService = eventService || new EventService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const events = await this.eventService.findAll();
      res.json(events);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const event = await this.eventService.findById(id);
      res.json(event);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateEventDto;
      const event = await this.eventService.create(dto);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as Partial<EventDto>;
      const event = await this.eventService.update(id, dto);
      res.json(event);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.eventService.remove(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
