import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { CurrencySymbol } from './give.dto';

@Entity({ name: "give_data" })
export class Give extends BaseEntity {
  @Column()
  optionsHeading!: string;

  @OneToMany(() => SupportedCurrency, (item) => item.give, { cascade: true })
  currencies!: SupportedCurrency[];

  @OneToMany(() => GivingArea, (item) => item.give, { cascade: true })
  givingArea!: GivingArea[];
}

@Entity({ name: "giving_area" })
export class GivingArea extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Give, (give) => give.currencies)
  give!: Give;
}

@Entity({ name: "supported_currency" })
export class SupportedCurrency extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  symbol!: CurrencySymbol;

  @ManyToOne(() => Give, (give) => give.currencies)
  give!: Give;
}