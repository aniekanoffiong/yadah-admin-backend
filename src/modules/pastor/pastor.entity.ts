import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class Pastor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  slug!: string;

  @Column()
  image!: string;

  @Column()
  role!: string;

  @Column()
  name!: string;
  
  @Column()
  about!: string;

  @Column('text')
  description!: string;

  @Column('text')
  quote!: string;

  @Column('text')
  others!: string;
  
  @Column()
  isLeadPastor: boolean = false;

  @Column({ nullable: true })
  focusTitle?: string

  @Column({ nullable: true, type: 'text' })
  focusContent?: string

  @OneToMany(() => Achievement, (achievement) => achievement.pastor, {
    cascade: true,
  })
  achievements!: Achievement[];

  @OneToMany(() => MinistryJourneyItem, (journey) => journey.pastor, {
    cascade: true,
  })
  journey!: MinistryJourneyItem[];

  @OneToMany(() => MinistryFocus, (focus) => focus.pastor, { 
    cascade: true 
  })
  focus!: MinistryFocus[];
}

@Entity()
export class MinistryFocus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => Pastor, (pastor) => pastor.focus)
  pastor!: Pastor;
}

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;

  @Column()
  text!: string;

  @ManyToOne(() => Pastor, (pastor) => pastor.achievements)
  pastor!: Pastor;
}

@Entity()
export class MinistryJourneyItem extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  year!: number;

  @Column('text')
  content!: string;

  @ManyToOne(() => Pastor, (pastor) => pastor.journey)
  pastor!: Pastor;
}