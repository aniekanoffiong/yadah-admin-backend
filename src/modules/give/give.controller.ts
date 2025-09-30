import { NextFunction, Request, Response } from 'express';
import { GiveService } from './give.service';
import { CreateCurrencyDto, CreateGivingAreaDto, CurrencyDto, GiveDto, GivingAreaDto, toCurrencyDto, toGivingAreaDto } from './give.dto';
import { Give, GivingArea, SupportedCurrency } from './give.entity';

export class GiveController {
  private giveService: GiveService;

  constructor(giveService?: GiveService) {
    this.giveService = giveService || new GiveService();
  }

  async find(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const give = await this.giveService.find();
      res.json({ data: [this.toDto(give)] });
    } catch {
      res.status(400).json({ message: 'Unable to retrieve give data' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const giveData = req.body;
      const updated = await this.giveService.update(id, giveData);
      if (updated) {
        res.json({ data: this.toDto(updated) });
      } else {
        res.status(404).json({ message: 'Give record not found' });
      }
    } catch {
      res.status(400).json({ message: 'Failed to update give record' });
    }
  }

  // Currencies
  allCurrencies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("received request to get currencies")
    try {
      const about = await this.giveService.findAllCurrencies();
      res.json({ data: about.map(toCurrencyDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  createCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateCurrencyDto;
      const currency = await this.giveService.createCurrency(dto);
      res.json({ data: toCurrencyDto(currency) });
    } catch (error) {
      next(error);
    }
  };

  updateCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateCurrencyDto;
      const currency = await this.giveService.updateCurrency(id, dto);
      res.json({ data: toCurrencyDto(currency) });
    } catch (error) {
      next(error);
    }
  };

  deleteCurrency = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.giveService.deleteCurrency(id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

  // Giving Area
  allGivingAreas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const givingArea = await this.giveService.findAllGivingAreas();
      res.json({ data: givingArea.map(toGivingAreaDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  createGivingArea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGivingAreaDto;
      const givingArea = await this.giveService.createGivingArea(dto);
      res.json({ data: toGivingAreaDto(givingArea) });
    } catch (error) {
      next(error);
    }
  };

  updateGivingArea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGivingAreaDto;
      const givingArea = await this.giveService.updateGivingArea(id, dto);
      res.json({ data: toGivingAreaDto(givingArea) });
    } catch (error) {
      next(error);
    }
  };

  deleteGivingArea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.giveService.deleteGivingArea(id);
      res.sendStatus(204)
    } catch (error) {
      next(error);
    }
  };

  private toDto(give: Give): GiveDto {
    return {
      id: give.id,
      optionsHeading: give.optionsHeading,
      currencies: give.currencies?.map(toCurrencyDto.bind(this)),
      givingArea: give.givingArea?.map(toGivingAreaDto.bind(this)),
    }
  }
}
