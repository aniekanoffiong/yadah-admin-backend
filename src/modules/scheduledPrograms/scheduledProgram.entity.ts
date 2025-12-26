import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { DayOfWeek } from '../../utils/dayOfWeek';

@Entity()
export class ScheduledProgram extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'enum', enum: DayOfWeek })
  scheduledDay?: DayOfWeek;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ type: 'text', name: "additional_times", nullable: true })
  additionalTimes?: string;

  @Column()
  location!: string;

  @Column('text')
  description?: string;

  @Column()
  icon?: string;
  
  @Column()
  image?: string;
}
