import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Hero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  backgroundImage!: string;

  @Column()
  title!: string;

  @Column({ nullable: true, type: 'varchar' })
  subtitle!: string | null;

  @Column()
  isActive!: boolean;

  @Column()
  page!: string; // home, about, etc

  @Column({ nullable: true })
  showControls?: boolean;

  @Column({ nullable: true })
  volunteerProgramText?: string;

  @Column({ nullable: true })
  volunteerProgramLink?: string;
}
