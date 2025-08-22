import { Repository } from 'typeorm';
import { NextStep, NextStepItem, NextStepVariants } from './nextStep.entity';
import { AppDataSource } from '../../database/data-source';

export class NextStepRepository {
  private repo: Repository<NextStep>;
  private itemRepo: Repository<NextStepItem>;

  constructor() {
    this.repo = AppDataSource.getRepository(NextStep);
    this.itemRepo = AppDataSource.getRepository(NextStepItem);
  }

  async find(variant: NextStepVariants): Promise<NextStep | null> {
    return this.repo.findOne({ where: { variant }, relations: ["items"] });
  }

  async create(nextStep: NextStep): Promise<NextStep> {
    return this.repo.save(nextStep);
  }

  async update(nextStep: NextStep): Promise<NextStep> {
    return this.repo.save(nextStep);
  }

  async findNextStepItem(id: number): Promise<NextStepItem | null> {
    return this.itemRepo.findOne({ where: { id } });
  }
  
  async updateNextStepItem(nextStepItem: NextStepItem): Promise<NextStepItem> {
    return this.itemRepo.save(nextStepItem);
  }

  async deleteNextStepItem(id: number): Promise<void> {
    await this.itemRepo.delete(id);
  }
}
