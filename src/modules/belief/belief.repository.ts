import { Repository } from 'typeorm';
import { Belief, BeliefItem } from './belief.entity';
import { AppDataSource } from '../../database/data-source';

export class BeliefRepository {
  private repo: Repository<Belief>;
  private beliefItemRepo: Repository<BeliefItem>;

  constructor() {
    this.repo = AppDataSource.getRepository(Belief);
    this.beliefItemRepo = AppDataSource.getRepository(BeliefItem);
  }

  async find(): Promise<Belief | null> {
    return this.repo.findOne({ where: { id: 1 }, relations: ["items"]});
  }

  async update(belief: Belief): Promise<Belief> {
    return this.repo.save(belief);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  // BeliefItem
  async findAllBeliefItems(): Promise<BeliefItem[]> {
    return this.beliefItemRepo.find();
  }

  async findBeliefItem(id: number): Promise<BeliefItem | null> {
    return this.beliefItemRepo.findOne({ where: { id }});
  }

  async createBeliefItem(beliefItem: BeliefItem): Promise<BeliefItem> {
    return this.beliefItemRepo.save(beliefItem);
  }

  async updateBeliefItem(beliefItem: BeliefItem): Promise<BeliefItem> {
    return this.beliefItemRepo.save(beliefItem);
  }

  async deleteBeliefItem(beliefItemId: number): Promise<void> {
    await this.beliefItemRepo.delete({ id: beliefItemId });
  }

}
