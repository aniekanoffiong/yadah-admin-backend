import { Repository } from 'typeorm';
import { Belief } from './belief.entity';
import { AppDataSource } from '../../database/data-source';

export class BeliefRepository {
  private repo: Repository<Belief>;

  constructor() {
    this.repo = AppDataSource.getRepository(Belief);
  }

  async findAll(): Promise<Belief[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Belief | null> {
    return this.repo.findOne({ where: { id }});
  }

  async create(belief: Belief): Promise<Belief> {
    return this.repo.save(belief);
  }

  async update(belief: Belief): Promise<Belief> {
    return this.repo.save(belief);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
