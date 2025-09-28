import { Give, GivingArea, SupportedCurrency } from './give.entity';
import { CreateCurrencyDto, CreateGiveDto, CreateGivingAreaDto } from './give.dto';
import { GiveRepository } from './give.repository';

export class GiveService {
  private giveRepository: GiveRepository;

  constructor() {
    this.giveRepository = new GiveRepository;
  }

  async find(): Promise<Give> {
    const givingData = await this.giveRepository.find();
    if (!givingData) throw new Error("Giving Data not found")
    return givingData;
  }

  async create(giveData: CreateGiveDto): Promise<Give> {
    const give = new Give()
    Object.assign(give, giveData)    
    const saved = this.giveRepository.save(give);
    return saved;
  }

  async update(id: number, giveData: Partial<Give>): Promise<Give | null> {
    const give = await this.find();
    Object.assign(give, giveData);
    const updated = this.giveRepository.save(give);
    return updated
  }

  async delete(id: number): Promise<void> {
    const result = await this.giveRepository.delete(id);
  }

  // Currencies
  async findAllCurrencies(): Promise<SupportedCurrency[]> {
    return this.giveRepository.findAllCurrencies();
  }

  async createCurrency(dto: CreateCurrencyDto): Promise<SupportedCurrency> {
    await this.find()
    const currency = new SupportedCurrency();
    currency.name = dto.name;
    currency.symbol = dto.symbol;

    return this.giveRepository.createCurrency(currency);
  }
  
  async updateCurrency(id: number, dto: CreateCurrencyDto): Promise<SupportedCurrency> {
    await this.find();
    const currency = await this.giveRepository.findCurrency(id)
    if (!currency) throw Error(`Currency with id ${id} not found`)
    currency.name = dto.name;
    currency.symbol = dto.symbol;
    
    return this.giveRepository.updateCurrency(currency);
  }

  async deleteCurrency(id: number): Promise<void> {
    return this.giveRepository.deleteCurrency(id)
  }

  // Giving Area
  async findAllGivingAreas(): Promise<GivingArea[]> {
    return this.giveRepository.findAllGivingAreas();
  }

  async createGivingArea(dto: CreateGivingAreaDto): Promise<GivingArea> {
    await this.find()
    const currency = new GivingArea();
    currency.title = dto.title;
    currency.description = dto.description;

    return this.giveRepository.createGivingArea(currency);
  }
  
  async updateGivingArea(id: number, dto: CreateGivingAreaDto): Promise<GivingArea> {
    await this.find();
    const currency = await this.giveRepository.findGivingArea(id)
    if (!currency) throw Error(`GivingArea with id ${id} not found`)
    currency.title = dto.title;
    currency.description = dto.description;
    
    return this.giveRepository.updateGivingArea(currency);
  }

  async deleteGivingArea(id: number): Promise<void> {
    return this.giveRepository.deleteGivingArea(id)
  }
}
