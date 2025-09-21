import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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
  address!: string;

  @Column()
  email!: string;

  @Column('text', { array: true })
  phones!: string[];

  @ManyToMany(() => SocialLink, (social) => social.contacts, { cascade: true, eager: true })
  @JoinTable({
    name: 'contact_social_social_links',
    joinColumn: {
      name: "contactId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "socialLinkId",
      referencedColumnName: "id"
    }
  })
  socialPlatforms!: SocialLink[];
}
