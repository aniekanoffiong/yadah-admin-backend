import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { SpecificPage } from '../../utils/enums';

export enum NextStepVariants {
  QuestionNextStep = 'QuestionNextStep',
  StandardNextStep = 'StandardNextStep',
}

@Entity()
export class NextStep extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true, type: 'varchar' })
  subtitle!: string | null;
  
  @Column({ type: 'enum', enum: NextStepVariants })
  variant!: NextStepVariants

  @Column({ type: 'enum', enum: SpecificPage })
  page?: SpecificPage

  @OneToMany(() => NextStepItem, (item) => item.nextStep, { cascade: true })
  items!: NextStepItem[];
}

@Entity()
export class NextStepItem extends BaseEntity {
  @Column()
  icon!: string;

  @Column()
  title!: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column()
  buttonText?: string;

  @Column()
  buttonLink?: string;

  @ManyToOne(() => NextStep, (values) => values.items)
  nextStep!: NextStep;
}
