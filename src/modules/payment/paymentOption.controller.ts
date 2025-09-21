import { Request, Response, NextFunction } from 'express';
import { PaymentOptionService } from './paymentOption.service';
import { CreatePaymentOptionDto, PaymentOptionDto } from './paymentOption.dto';
import { PaymentOption } from './paymentOption.entity';

export class PaymentOptionController {
  private paymentService: PaymentOptionService;

  constructor(paymentService?: PaymentOptionService) {
    this.paymentService = paymentService || new PaymentOptionService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentOptions = await this.paymentService.findAll();
      res.json({ data: paymentOptions.map(this.toDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const paymentOption = await this.paymentService.findOne(id);
      res.json({ data: this.toDto(paymentOption) });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreatePaymentOptionDto;
      const paymentOption = await this.paymentService.create(dto);
      res.status(201).json({ data: this.toDto(paymentOption) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreatePaymentOptionDto;
      const paymentOption = await this.paymentService.update(id, dto);
      res.json({ data: this.toDto(paymentOption) });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.paymentService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private toDto(entity: PaymentOption): PaymentOptionDto & Record<string, string | number | boolean> {
    return {
      id: entity.id,
      title: entity.title,
      isEnabled: entity.isEnabled,
      ...JSON.parse(entity.config) as Record<string, string>,
    };
  }
}
