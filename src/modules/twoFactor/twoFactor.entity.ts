import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { TwoFactorPurposeEnum } from '../../enum/twoFactorPurpose.enum';
import { TwoFactorStatusEnum } from '../../enum/twoFactorStatus.enum';
import { BaseEntity } from '../base/base.entity';

@Entity('two_factor')
export class TwoFactor extends BaseEntity {
  @Column('varchar')
  tempSessionToken!: string;

  @Column('varchar', { length: 10 })
  code!: string;

  @Column('varchar', { default: TwoFactorPurposeEnum.LOGIN })
  purpose: string = TwoFactorPurposeEnum.LOGIN;

  @Column('varchar', { default: null })
  hashPassword!: string | null;

  @Column('varchar', { default: TwoFactorStatusEnum.PENDING })
  status: string = TwoFactorStatusEnum.PENDING;

  @Column({
    type: 'timestamp',
    name: 'expire_at',
  })
  expireAt!: Date;

  @Column()
  userId!: number;
}
