import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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

  @Column({ nullable: true })
  meetingTime?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  leader?: string;

  @OneToMany(() => MinistryActivity, (activity) => activity.ministry, { onDelete: 'CASCADE' })
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

  @ManyToOne(() => Ministry, (ministry) => ministry.activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ministryId' })
  ministry!: Ministry;
}
