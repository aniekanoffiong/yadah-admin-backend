import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class MinistryFocus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;
}

@Entity()
export class Pastor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  image!: string;

  @Column()
  role!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('text')
  quote!: string;
  
  @Column()
  isLeadPastor: boolean = false;

  @OneToMany(() => Achievement, (achievement) => achievement.pastor, {
    cascade: true,
  })
  achievements!: Achievement[];

  @OneToOne(() => MinistryFocus, { cascade: true })
  @JoinColumn()
  ministry?: MinistryFocus;
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
