import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { GalleryItem } from '../gallery/gallery.entity';
import { Sermon } from '../sermon/sermon.entity';

@Entity()
export class ItemTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  label!: string;

  @Column()
  isActive!: boolean;

  @ManyToMany(() => GalleryItem, item => item.tags)
  galleryItems!: GalleryItem[];

  @ManyToMany(() => Sermon, item => item.tags)
  sermons!: Sermon[];
}
