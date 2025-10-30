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

  @ManyToMany(() => SocialLink, (social) => social.footers, { cascade: true })
  @JoinTable({
    name: 'footer_social_social_links',
    joinColumn: {
      name: "footerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "socialLinkId",
      referencedColumnName: "id"
    }
  })
  socialLinks!: SocialLink[];

  @ManyToMany(() => SiteLink, (site) => site.footerQuickLinks, { cascade: true })
  @JoinTable({
    name: 'footer_quick_links',
    joinColumn: {
      name: "footerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "siteLinkId",
      referencedColumnName: "id"
    }
  })
  quickLinks!: SiteLink[];

  @ManyToMany(() => SiteLink, (site) => site.footerMinistriesLinks, { cascade: true })
  @JoinTable({
    name: 'footer_ministries_links',
    joinColumn: {
      name: "footerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "siteLinkId",
      referencedColumnName: "id"
    }
  })
  ministriesLinks!: SiteLink[];

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @ManyToMany(() => SiteLink, (site) => site.footerLegalLinks, { cascade: true })
  @JoinTable({
    name: 'footer_legal_links',
    joinColumn: {
      name: "footerId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "siteLinkId",
      referencedColumnName: "id"
    }
  })
  legalLinks!: SiteLink[];

  @Column()
  copyright!: string;
}
