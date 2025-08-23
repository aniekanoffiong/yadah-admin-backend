import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: "watch_live" })
export class Live extends BaseEntity {
  @Column({ nullable: true })
  videoId!: string;

  @Column({ nullable: true })
  title!: string;

  @Column()
  date!: Date;

  @Column({ type: 'timestamp', nullable: true })
  startTime!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime!: Date;

  @Column({ default: false })
  isLive!: boolean;
}
