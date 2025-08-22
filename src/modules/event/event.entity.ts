import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ItemTag } from '../itemTag/itemTag.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  location!: string;

  @Column('text')
  description!: string;

  @Column()
  image!: string;

  @ManyToMany(() => ItemTag, tag => tag.events, { cascade: true })
  @JoinTable({ name: 'event_tags_item_tag' })
  tags!: ItemTag[];
}
