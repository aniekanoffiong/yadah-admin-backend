import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { Give, GivingArea, SupportedCurrency } from './give.entity';

export class GiveRepository {
  private giveRepo: Repository<Give>;
  private currencyRepo: Repository<SupportedCurrency>;
  private givingAreaRepo: Repository<GivingArea>;

  constructor() {
    this.giveRepo = AppDataSource.getRepository(Give);
    this.currencyRepo = AppDataSource.getRepository(SupportedCurrency);
    this.givingAreaRepo = AppDataSource.getRepository(GivingArea);
  }

  async find(): Promise<Give | null> {
    return this.giveRepo.findOne({ where: { id: 1 }, relations: ['currencies', "givingArea"] });
  }

  async save(give: Give): Promise<Give> {
    return this.giveRepo.save(give);
  }

  // Currency
  async findAllCurrencies(): Promise<SupportedCurrency[]> {
    return this.currencyRepo.find();
  }

  async findCurrency(id: number): Promise<SupportedCurrency | null> {
    return this.currencyRepo.findOne({ where: { id }});
  }

  async createCurrency(currency: SupportedCurrency): Promise<SupportedCurrency> {
    return this.currencyRepo.save(currency);
  }

  async updateCurrency(currency: SupportedCurrency): Promise<SupportedCurrency> {
    return this.currencyRepo.save(currency);
  }

  async deleteCurrency(id: number): Promise<void> {
    await this.currencyRepo.delete(id);
  }

  // Giving Area
  async findAllGivingAreas(): Promise<GivingArea[]> {
    return this.givingAreaRepo.find();
  }

  async findGivingArea(id: number): Promise<GivingArea | null> {
    return this.givingAreaRepo.findOne({ where: { id }});
  }

  async createGivingArea(givingArea: GivingArea): Promise<GivingArea> {
    return this.givingAreaRepo.save(givingArea);
  }

  async updateGivingArea(givingArea: GivingArea): Promise<GivingArea> {
    return this.givingAreaRepo.save(givingArea);
  }

  async deleteGivingArea(id: number): Promise<void> {
    await this.givingAreaRepo.delete(id);
  }
}
