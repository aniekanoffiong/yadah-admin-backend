import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Footer } from "../footer/footer.entity";
import { ContactInfo } from "../contact/contact.entity";

@Entity()
export class SocialLink extends BaseEntity {
  @Column({ nullable: true })
  platform?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  url!: string;

  @ManyToMany(() => Footer, (footer) => footer.socialLinks)
  footers!: Footer[];

  @ManyToMany(() => ContactInfo, (contact) => contact.socialPlatforms)
  contacts!: ContactInfo[];
}
