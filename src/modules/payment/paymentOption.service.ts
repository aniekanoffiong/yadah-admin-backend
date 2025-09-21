import { PaymentOption } from './paymentOption.entity';
import { CreatePaymentOptionDto, paymentOptionTypeToFieldMap } from './paymentOption.dto';
import { PaymentOptionRepository } from './paymentOption.repository';

export class PaymentOptionService {
  private paymentOptionRepository: PaymentOptionRepository;

  constructor(paymentOptionRepository?: PaymentOptionRepository) {
    this.paymentOptionRepository = paymentOptionRepository || new PaymentOptionRepository();
  }

  async findAll(): Promise<PaymentOption[]> {
    return this.paymentOptionRepository.findAll();
  }

  async findEnabledOptions(): Promise<PaymentOption[]> {
    return this.paymentOptionRepository.findEnabledOptions();
  }

  async findOne(id: number): Promise<PaymentOption> {
    const paymentOption = await this.paymentOptionRepository.findOne(id);
    if (!paymentOption) throw new Error(`PaymentOption with id ${id} not found`);
    return paymentOption;
  }

  async create(dto: CreatePaymentOptionDto & Record<string, any>): Promise<PaymentOption> {
    const paymentOption = new PaymentOption();
    paymentOption.title = dto.title;
    paymentOption.isEnabled = dto.isEnabled;
    paymentOption.config = JSON.stringify(this.getConfigData(dto));

    return this.paymentOptionRepository.create(paymentOption);
  }

  async update(id: number, dto: CreatePaymentOptionDto & Record<string, any>): Promise<PaymentOption> {
    const paymentOption = await this.findOne(id);
    paymentOption.title = dto.title;
    paymentOption.isEnabled = dto.isEnabled;
    paymentOption.config = JSON.stringify(this.getConfigData(dto));
    return this.paymentOptionRepository.update(paymentOption);
  }

  async delete(id: number): Promise<void> {
    await this.paymentOptionRepository.delete(id);
  }

  private getConfigData(dto: CreatePaymentOptionDto & Record<string, any>): Record<string, string> {
    const fields = paymentOptionTypeToFieldMap[dto.title];
    return fields.reduce((acc, field) => {
      acc[field] = dto[field];
      return acc;
    }, {} as Record<string, string>);
  }
}
