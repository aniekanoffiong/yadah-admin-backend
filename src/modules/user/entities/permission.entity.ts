import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string; // e.g., "get.hero", "update.hero", ...

  @Column('text')
  description!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
