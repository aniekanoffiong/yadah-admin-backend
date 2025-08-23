import { Repository } from 'typeorm';
import { GivingArea } from './givingArea.entity';
import { AppDataSource } from '../../database/data-source';

export class GivingAreaRepository {
  private givingAreaRepo: Repository<GivingArea>;

  constructor() {
    this.givingAreaRepo = AppDataSource.getRepository(GivingArea);
  }

  async findAllGivingAreas(): Promise<GivingArea[]> {
    return this.givingAreaRepo.find();
  }

  async findTagById(id: number): Promise<GivingArea | null> {
    return this.givingAreaRepo.findOne({ where: { id }});
  }

  async createGivingArea(area: GivingArea): Promise<GivingArea> {
    return this.givingAreaRepo.save(area);
  }

  async updateGivingArea(area: GivingArea): Promise<GivingArea> {
    return this.givingAreaRepo.save(area);
  }

  async deleteGivingArea(id: number): Promise<void> {
    await this.givingAreaRepo.delete(id);
  }
}
