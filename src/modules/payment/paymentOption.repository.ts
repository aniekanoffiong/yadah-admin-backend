import { Repository } from 'typeorm';
import { PaymentOption } from './paymentOption.entity';
import { AppDataSource } from '../../database/data-source';

export class PaymentOptionRepository {
  private paymentOptionRepo: Repository<PaymentOption>;

  constructor() {
    this.paymentOptionRepo = AppDataSource.getRepository(PaymentOption);
  }

  async findAll(): Promise<PaymentOption[]> {
    return this.paymentOptionRepo.find();
  }

  async findEnabledOptions(): Promise<PaymentOption[]> {
    return this.paymentOptionRepo.find({ where: { isEnabled: true }});
  }

  async findOne(id: number): Promise<PaymentOption | null> {
    return this.paymentOptionRepo.findOne({ where: { id } });
  }

  async create(paymentOption: PaymentOption): Promise<PaymentOption> {
    return this.paymentOptionRepo.save(paymentOption);
  }

  async update(paymentOption: PaymentOption): Promise<PaymentOption> {
    return this.paymentOptionRepo.save(paymentOption);
  }

  async delete(id: number): Promise<void> {
    await this.paymentOptionRepo.delete(id);
  }
}
