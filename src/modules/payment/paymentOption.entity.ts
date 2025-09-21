import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class PaymentOption extends BaseEntity {
  @Column()
  title!: PaymentOptionType;

  @Column()
  isEnabled!: boolean;

  @Column({ type: 'json', nullable: true })
  config!: string
}

export enum PaymentOptionType {
  BANK_TRANSFER = "bank_transfer",
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
}