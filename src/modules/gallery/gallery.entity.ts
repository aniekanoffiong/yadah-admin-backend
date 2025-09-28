import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ItemTag } from '../itemTag/itemTag.entity';

@Entity()
export class GalleryItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  src!: string;

  @Column()
  alt!: string;

  @Column()
  caption!: string;

  @Column()
  date!: string;

  @ManyToMany(() => ItemTag, tag => tag.galleryItems, { cascade: true })
  @JoinTable()
  tags!: ItemTag[];
}
