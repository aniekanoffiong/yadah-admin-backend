import { Request, Response, NextFunction } from 'express';
import { GrowInFaithService } from './growInFaith.service';
import { CreateGrowInFaithDto } from './growInFaith.dto';

export class GrowInFaithController {
  private service: GrowInFaithService;

  constructor(service?: GrowInFaithService) {
    this.service = service || new GrowInFaithService();
  }

  get = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.service.findOne();
      res.json({ data: [result] });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGrowInFaithDto;
      const result = await this.service.update(dto);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  };
}
