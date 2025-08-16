import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity()
export class Belief extends BaseEntity {
  @Column()
  title!: string;

  @Column('text')
  content!: string;
}
