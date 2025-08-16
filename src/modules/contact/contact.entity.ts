import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { SocialLink } from "../social/social.entity";

@Entity()
export class ContactInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  addressTitle!: string;

  @Column()
  location!: string;

  @Column()
  email!: string;

  @Column('text', { array: true })
  phones!: string[];

  @Column()
  chat!: string;

  @OneToMany(() => SocialLink, (social) => social.contacts, { cascade: true, eager: true })
  @JoinTable({ name: 'contact_social_social_links' })
  socialPlatforms!: SocialLink[];
}
