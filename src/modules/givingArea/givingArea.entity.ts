import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class GivingArea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;

  @Column()
  title!: string;

  @Column()
  description!: boolean;
}
