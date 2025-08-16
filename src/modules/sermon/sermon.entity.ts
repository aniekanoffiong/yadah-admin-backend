import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ItemTag } from '../itemTag/itemTag.entity';

@Entity()
export class Sermon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  minister!: string;

  @Column()
  date!: Date;

  @Column()
  duration!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({ default: false })
  featured!: boolean;

  @Column({ nullable: true })
  videoUrl?: string;

  @ManyToMany(() => ItemTag, tag => tag.sermons, { cascade: true })
  @JoinTable({ name: 'sermon_tags_item_tag' })
  tags!: ItemTag[];
}
