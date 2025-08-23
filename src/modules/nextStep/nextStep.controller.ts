import { Request, Response, NextFunction } from 'express';
import { NextStepService } from './nextStep.service';
import { CreateNextStepDto, UpdateNextStepItemDto } from './nextStep.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class NextStepController {
  private nextStepService: NextStepService;

  constructor(nextStepService?: NextStepService) {
    this.nextStepService = nextStepService || new NextStepService();
  }

  getById = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const nextStep = await this.nextStepService.findOne();
      res.json(this.toDto(nextStep));
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateNextStepDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const newNextStep = await this.nextStepService.create(dto);
      res.status(201).json(this.toDto(newNextStep));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = plainToClass(CreateNextStepDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const updatedNextStep = await this.nextStepService.update(dto);
      res.json(this.toDto(updatedNextStep));
    } catch (error) {
      next(error);
    }
  };

  findNextStepItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const nextStep = await this.nextStepService.findNextStepItem(id);
      res.json(this.toDto(nextStep));
    } catch (error) {
      next(error);
    }
  };

  updateNextStepItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as UpdateNextStepItemDto;
      const updatedNextStep = await this.nextStepService.updateNextStepItem(id, dto);
      res.json(this.toDto(updatedNextStep));
    } catch (error) {
      next(error);
    }
  };

  removeNextStepItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.nextStepService.deleteNextStepItem(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };



  private toDto(nextStep: any) {
    return {
      id: nextStep.id,
      page: nextStep.page,
      backgroundImage: nextStep.backgroundImage,
      title: nextStep.title,
      subtitle: nextStep.subtitle,
      showControls: nextStep.showControls,
      volunteerProgramText: nextStep.volunteerProgramText,
      volunteerProgramLink: nextStep.volunteerProgramLink,
    };
  }
}
