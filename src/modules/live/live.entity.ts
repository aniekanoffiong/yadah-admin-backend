import { Entity, Column } from 'typeorm';
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

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: false })
  isLive!: boolean;
}
