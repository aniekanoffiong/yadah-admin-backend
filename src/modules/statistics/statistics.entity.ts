import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Statistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => StatItem, (statItem) => statItem.statistics, {
    cascade: true,
  })
  stats!: StatItem[];

  @Column({ nullable: true })
  backgroundImage?: string;
}

@Entity()
export class StatItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: string;

  @Column()
  label!: string;

  @Column({ nullable: true })
  icon?: string;

  @ManyToOne(() => Statistics, (statistics) => statistics.stats)
  statistics!: Statistics;
}
