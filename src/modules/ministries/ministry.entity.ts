import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DayOfWeek } from '../../utils/dayOfWeek';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  scheduledDay!: DayOfWeek;

  @Column({ nullable: true })
  meetingTime?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  leader?: string;

  @OneToMany(() => MinistryActivity, (activity) => activity.ministry, { cascade: true })
  activities?: MinistryActivity[];

  @Column({ nullable: true })
  members?: string;
}

@Entity()
export class MinistryActivity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activityName!: string;

  @ManyToOne(() => Ministry, (ministry) => ministry.activities)
  @JoinColumn({ name: 'ministryId' })
  ministry!: Ministry;
}
