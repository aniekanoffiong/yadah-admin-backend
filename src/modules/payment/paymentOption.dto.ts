import {
  IsString,
  IsBoolean,
  IsJSON,
} from 'class-validator';

export class PaymentOptionDto {
  id!: number;
  title!: string;
  isEnabled!: string;
  config!: JSON;
}

export class CreatePaymentOptionDto {
  @IsString()
  title!: string;

  @IsBoolean()
  isEnabled!: boolean;

  @IsJSON()
  config!: string;
}
