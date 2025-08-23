import { Request, Response, NextFunction } from 'express';
import { PaymentOptionService } from './paymentOption.service';
import { CreatePaymentOptionDto } from './paymentOption.dto';

export class PaymentOptionController {
  private paymentService: PaymentOptionService;

  constructor(paymentService?: PaymentOptionService) {
    this.paymentService = paymentService || new PaymentOptionService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentOptions = await this.paymentService.findAll();
      res.json({ data: paymentOptions });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const paymentOption = await this.paymentService.findOne(id);
      res.json({ data: paymentOption });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreatePaymentOptionDto;
      const paymentOption = await this.paymentService.create(dto);
      res.status(201).json({ data: paymentOption });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreatePaymentOptionDto;
      const paymentOption = await this.paymentService.update(id, dto);
      res.json({ data: paymentOption });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.paymentService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
