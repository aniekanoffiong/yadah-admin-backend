import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Statistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => StatItem, (statItem) => statItem.statistics, {
    cascade: true,
  })
  statItems!: StatItem[];

  @Column({ nullable: true })
  backgroundImage?: string;
}

@Entity()
export class StatItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: number;

  @Column()
  label!: string;

  @Column({ nullable: true })
  icon?: string;

  @Column()
  statisticsId!: number;

  @ManyToOne(() => Statistics, (statistics) => statistics.statItems)
  statistics!: Statistics;
}
