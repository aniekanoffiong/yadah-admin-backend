import { Repository } from 'typeorm';
import { CallToAction, CTAButton } from './cta.entity';
import { AppDataSource } from '../../database/data-source';

export class CallToActionRepository {
  private ctaRepo: Repository<CallToAction>;
  private buttonRepo: Repository<CTAButton>;

  constructor() {
    this.ctaRepo = AppDataSource.getRepository(CallToAction);
    this.buttonRepo = AppDataSource.getRepository(CTAButton);
  }

  async findAll(): Promise<CallToAction[]> {
    return this.ctaRepo.find({ relations: ['buttons'] });
  }

  async findOne(id: number): Promise<CallToAction | null> {
    return this.ctaRepo.findOne({ where: { id }, relations: ['buttons'] });
  }

  async create(cta: CallToAction): Promise<CallToAction> {
    return this.ctaRepo.save(cta);
  }

  async update(cta: CallToAction): Promise<CallToAction> {
    return this.ctaRepo.save(cta);
  }

  async delete(id: number): Promise<void> {
    await this.ctaRepo.delete(id);
  }

  async deleteButtons(ctaId: number): Promise<void> {
    await this.buttonRepo.delete({ callToAction: { id: ctaId } });
  }
}
