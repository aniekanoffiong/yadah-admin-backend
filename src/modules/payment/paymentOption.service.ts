import { PaymentOption } from './paymentOption.entity';
import { CreatePaymentOptionDto } from './paymentOption.dto';
import { PaymentOptionRepository } from './paymentOption.repository';

export class PaymentOptionService {
  private paymentOptionRepository: PaymentOptionRepository;

  constructor(paymentOptionRepository?: PaymentOptionRepository) {
    this.paymentOptionRepository = paymentOptionRepository || new PaymentOptionRepository();
  }

  async findAll(): Promise<PaymentOption[]> {
    return this.paymentOptionRepository.findAll();
  }

  async findOne(id: number): Promise<PaymentOption> {
    const paymentOption = await this.paymentOptionRepository.findOne(id);
    if (!paymentOption) throw new Error(`PaymentOption with id ${id} not found`);
    return paymentOption;
  }

  async create(dto: CreatePaymentOptionDto): Promise<PaymentOption> {
    const paymentOption = new PaymentOption();
    paymentOption.title = dto.title;
    paymentOption.isEnabled = dto.isEnabled;
    paymentOption.config = dto.config;

    return this.paymentOptionRepository.create(paymentOption);
  }

  async update(id: number, dto: CreatePaymentOptionDto): Promise<PaymentOption> {
    const paymentOption = await this.findOne(id);
    paymentOption.title = dto.title;
    paymentOption.isEnabled = dto.isEnabled;
    paymentOption.config = dto.config;
    return this.paymentOptionRepository.update(paymentOption);
  }

  async delete(id: number): Promise<void> {
    await this.paymentOptionRepository.delete(id);
  }
}
