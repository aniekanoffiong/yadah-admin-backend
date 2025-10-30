import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class CallToAction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  page!: string;

  @Column()
  pageSection?: string;

  @Column()
  backgroundImage?: string;

  @OneToMany(() => CTAAddedInfo, (info) => info.callToAction, { cascade: true })
  addedInfo?: CTAAddedInfo[];

  @OneToMany(() => CTAButton, (button) => button.callToAction, { cascade: true })
  buttons!: CTAButton[];
}

@Entity()
export class CTAButton {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  variant!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  icon?: string;

  @ManyToOne(() => CallToAction, (cta) => cta.buttons)
  callToAction!: CallToAction;
}

@Entity()
export class CTAAddedInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: string;

  @Column()
  description!: string;

  @ManyToOne(() => CallToAction, (cta) => cta.addedInfo)
  callToAction!: CallToAction;
}
