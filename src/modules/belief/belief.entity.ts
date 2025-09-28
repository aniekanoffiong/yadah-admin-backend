import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class Belief extends BaseEntity {
  @Column()
  title!: string;

  @Column('text')
  subtitle!: string;

  @OneToMany(() => BeliefItem, (item) => item.belief, { cascade: true })
  items!: BeliefItem[];
}

@Entity()
export class BeliefItem extends BaseEntity {
  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column()
  beliefId!: number;

  @ManyToOne(() => Belief, (belief) => belief.items)
  belief!: Belief;
}
