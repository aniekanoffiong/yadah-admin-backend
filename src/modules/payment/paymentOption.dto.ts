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

export const mapOptionToName = (paymentOption: PaymentOptionType) => {
  switch (paymentOption) {
    case PaymentOptionType.BANK_TRANSFER:
      return 'Bank Transfer';
    case PaymentOptionType.CREDIT_CARD:
      return 'Card';
    case PaymentOptionType.PAYPAL:
      return 'PayPal'
  }
}

export const mapOptionToDescription = (paymentOption: PaymentOptionType) => {
  switch (paymentOption) {
    case PaymentOptionType.BANK_TRANSFER:
      return 'Pay directly into our bank account using your online banking. Allow 2–5 business days for the transfer to clear; include your reference so we can match the payment.';
    case PaymentOptionType.CREDIT_CARD:
      return 'Instant payment by card (Visa, MasterCard, etc.) via our secure payment processor. Payment is confirmed immediately.';
    case PaymentOptionType.PAYPAL:
      return 'Pay securely through PayPal. Instant confirmation and buyer protection where available.'
  }
}
