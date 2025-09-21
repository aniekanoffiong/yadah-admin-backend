import { Request, Response, NextFunction } from 'express';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './footer.dto';

export class FooterController {
  private footerService: FooterService;

  constructor(footerService?: FooterService) {
    this.footerService = footerService || new FooterService();
  }

  get = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const footer = await this.footerService.find();
      res.json({ data: [footer] });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateFooterDto;
      const footer = await this.footerService.create(dto);
      res.status(201).json({ data: footer });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateFooterDto;
      const footer = await this.footerService.update(id, dto);
      res.json({ data: footer });
    } catch (error) {
      next(error);
    }
  };
}
