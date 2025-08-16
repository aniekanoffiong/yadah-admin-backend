import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { SocialLink } from "../social/social.entity";
import { SiteLink } from "../siteLinks/siteLink.entity";

@Entity()
export class Footer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsletterTitle!: string;

  @Column()
  newsletterSubtitle!: string;

  @Column()
  logoSrc!: string;

  @Column()
  logoAlt!: string;

  @Column('text')
  description!: string;

  @ManyToMany(() => SocialLink, (social) => social.footers, { cascade: true, eager: true })
  @JoinTable({ name: 'footer_social_social_links' })
  socialLinks!: SocialLink[];

  @ManyToMany(() => SiteLink, (site) => site.footerQuickLinks, { cascade: true, eager: true })
  @JoinTable({ name: 'footer_quick_links' })
  quickLinks!: SiteLink[];

  @ManyToMany(() => SiteLink, (site) => site.footerMinistriesLinks, { cascade: true, eager: true })
  @JoinTable({ name: 'footer_ministries_links' })
  ministriesLinks!: SiteLink[];

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column('jsonb')
  schedule!: Record<string, string>;

  @ManyToMany(() => SiteLink, (site) => site.footerLegalLinks, { cascade: true, eager: true })
  @JoinTable({ name: 'footer_legal_links' })
  legalLinks!: SiteLink[];

  @Column()
  copyright!: string;
}
