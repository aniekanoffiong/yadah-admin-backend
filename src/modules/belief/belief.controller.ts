import { Request, Response, NextFunction } from 'express';
import { BeliefService } from './belief.service';
import { BeliefDto, BeliefItemDto, CreateBeliefDto, CreateBeliefItemDto, UpdateBeliefItemDto } from './belief.dto';
import { Belief, BeliefItem } from './belief.entity';

export class BeliefController {
  private beliefService: BeliefService;

  constructor(beliefService?: BeliefService) {
    this.beliefService = beliefService || new BeliefService();
  }

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const belief = await this.beliefService.find();
      res.json({ data: [this.toBeliefDto(belief)] });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateBeliefDto;
      const belief = await this.beliefService.update(dto);
      res.json({ data: this.toBeliefDto(belief) });
    } catch (error) {
      next(error);
    }
  };

  allBeliefItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const beliefItem = await this.beliefService.findAllBeliefItems();
      res.json({ data: beliefItem.map(this.toBeliefItemDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  createBeliefItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateBeliefItemDto;
      const beliefItem = await this.beliefService.createBeliefItem(dto);
      res.json({ data: this.toBeliefItemDto(beliefItem) });
    } catch (error) {
      next(error);
    }
  };

  updateBeliefItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as UpdateBeliefItemDto;
      const beliefItem = await this.beliefService.updateBeliefItem(id, dto);
      res.json({ data: this.toBeliefItemDto(beliefItem) });
    } catch (error) {
      next(error);
    }
  };

  deleteBeliefItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.beliefService.deleteBeliefItem(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private toBeliefDto(belief: Belief): BeliefDto {
    return {
      id: belief.id,
      title: belief.title,
      subtitle: belief.subtitle,
      items: belief.items.map(this.toBeliefItemDto.bind(this))
    }
  }

  private toBeliefItemDto(beliefItem: BeliefItem): BeliefItemDto {
    return {
      id: beliefItem.id,
      title: beliefItem.title,
      content: beliefItem.content,
    }
  }
}
