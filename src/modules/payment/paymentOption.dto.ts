import {
  IsString,
  IsBoolean,
  IsJSON,
} from 'class-validator';
import { PaymentOptionType } from './paymentOption.entity';

export class PaymentOptionDto {
  id!: number;
  title!: string;
  isEnabled!: boolean;
}

export class CreatePaymentOptionDto {
  @IsString()
  title!: PaymentOptionType;

  @IsBoolean()
  isEnabled!: boolean;
}

export const paymentOptionTypeToFieldMap: Record<PaymentOptionType, Array<string>> = {
  [PaymentOptionType.BANK_TRANSFER]: ['account_number', 'account_name', 'bank_name', 'sort_code', 'iban', 'swift_code'],
  [PaymentOptionType.CREDIT_CARD]: ['creditCard'],
  [PaymentOptionType.PAYPAL]: ['paypal'],
};
