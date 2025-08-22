import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class PaymentOption extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  isEnabled!: boolean;

  @Column({ type: 'json', nullable: true })
  config!: string
}
