import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/entities/user.entity';

@Entity({ name: "login_history" })
export class LoginHistory extends BaseEntity {
  @Column()
  deviceInfo!: string;

  @ManyToOne(() => User, (user) => user.loginHistory)
  user!: User;
}
