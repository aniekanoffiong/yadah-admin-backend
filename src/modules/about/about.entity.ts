import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class Values {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @OneToMany(() => ValueItem, (item) => item.values, { cascade: true })
  items!: ValueItem[];
}

@Entity()
export class ValueItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  icon!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @ManyToOne(() => Values, (values) => values.items)
  values!: Values;
}

@Entity()
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @OneToMany(() => StoryStat, (stats) => stats.story, { cascade: true })
  stats!: StoryStat[];
}

@Entity()
export class StoryStat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => Story, (story) => story.stats)
  story!: Story;
}

@Entity()
export class About extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mainTitle!: string;

  @Column()
  highlightedTitle!: string;

  @Column('text')
  description!: string;

  @OneToOne(() => Story, { cascade: true, eager: true })
  @JoinColumn()
  story!: Story;

  @OneToOne(() => Values, { cascade: true, eager: true })
  @JoinColumn()
  values!: Values;
}
