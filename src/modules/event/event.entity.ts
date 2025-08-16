import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  location!: string;

  @Column('text')
  description!: string;

  @Column()
  image!: string;
}
