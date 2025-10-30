import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class ContactMessage extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  subject!: string;

  @Column('text')
  message!: string;
}