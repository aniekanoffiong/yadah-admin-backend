import { IsNull, Repository } from 'typeorm';
import { CallToAction, CTAButton } from './cta.entity';
import { AppDataSource } from '../../database/data-source';
import { SpecificPage, SpecificPageSection } from '../../utils/enums';

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

  async findByPage(page: SpecificPage): Promise<CallToAction | null> {
    return this.ctaRepo.findOne({ where: { page, pageSection: IsNull() }, relations: ['buttons'] });
  }

  async findByPageSection(page: SpecificPage, pageSection: SpecificPageSection): Promise<CallToAction | null> {
    return this.ctaRepo.findOne({ where: { page, pageSection }, relations: ['buttons', 'addedInfo'] });
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
