import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: "watch_live" })
export class Live extends BaseEntity {
  @Column({ nullable: true })
  videoUrl!: string;

  @Column({ nullable: true })
  title!: string;

  @Column()
  date!: Date;

  @Column({ type: 'time', nullable: true })
  startTime!: string;

  @Column({ type: 'time', nullable: true })
  endTime!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  thumbnailUrl!: string;

  @Column({ type: 'boolean', default: false })
  wasLiveStream!: boolean; // Distinguish live streams from regular uploads

  @Column({ type: 'varchar', length: 20, nullable: true })
  duration!: string; // ISO 8601 duration format (e.g., "PT1H30M")

  @Column({ type: 'bigint', nullable: true })
  viewCount!: number;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: false })
  isLive!: boolean;
}
