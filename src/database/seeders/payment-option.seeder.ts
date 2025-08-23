import { PaymentOption } from '../../modules/payment/paymentOption.entity';
import { AppDataSource } from '../data-source';

const paymentOptionData = {
  title: 'bank_transfer',
  isEnabled: false,
  config: JSON.stringify({
    "account_number": "",
    "bank_name": "",
    "account_name": "",
    "sort_code": "",
  }),
};

export async function seedPaymentOption() {
  const pastorRepo = AppDataSource.getRepository(PaymentOption);

  const pastor = pastorRepo.create(paymentOptionData);
  await pastorRepo.save(pastor);

  console.log('Seeded Payment Options');
}
