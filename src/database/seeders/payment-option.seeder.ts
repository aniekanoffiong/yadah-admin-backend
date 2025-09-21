import { PaymentOption, PaymentOptionType } from '../../modules/payment/paymentOption.entity';
import { AppDataSource } from '../data-source';

const paymentOptionData = {
  title: PaymentOptionType.BANK_TRANSFER,
  isEnabled: false,
  config: JSON.stringify({
    "account_number": "",
    "bank_name": "",
    "account_name": "",
    "sort_code": "",
  }),
};

export async function seedPaymentOption() {
  const paymentRepo = AppDataSource.getRepository(PaymentOption);

  const pastor = paymentRepo.create(paymentOptionData);
  await paymentRepo.save(pastor);

  console.log('Seeded Payment Options');
}
