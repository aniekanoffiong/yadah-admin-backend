import { Repository } from 'typeorm';
import { GrowInFaith } from './growInFaith.entity';
import { AppDataSource } from '../../database/data-source';

export class GrowInFaithRepository {
  private repo: Repository<GrowInFaith>;

  constructor() {
    this.repo = AppDataSource.getRepository(GrowInFaith);
  }

  async findAll(): Promise<GrowInFaith[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<GrowInFaith | null> {
    return this.repo.findOne({ where: { id }});
  }

  async create(entity: GrowInFaith): Promise<GrowInFaith> {
    return this.repo.save(entity);
  }

  async update(entity: GrowInFaith): Promise<GrowInFaith> {
    return this.repo.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
