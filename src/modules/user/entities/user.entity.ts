import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';
import { BaseEntity } from '../../base/base.entity';
import { RolesEnum } from '../../../enum/roles.enum';

@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  mobile?: string;

  @Column()
  password!: string; // hash this in your app

  @ManyToMany(() => Role, (role) => role.users, { cascade: true, eager: true })
  @JoinTable({ name: 'users_roles' })
  roles!: Role[];

  userRole() {
    return this.roles.find(role => Object.values(RolesEnum).map(r => r.valueOf()).includes(role.name))
  }
}
