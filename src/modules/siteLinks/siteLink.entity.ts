import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Footer } from "../footer/footer.entity";

@Entity()
export class SiteLink extends BaseEntity {
  @Column({ nullable: true })
  label!: string;

  @Column()
  url!: string;

  @ManyToMany(() => Footer, (footer) => footer.quickLinks)
  footerQuickLinks!: Footer;

  @ManyToMany(() => Footer, (footer) => footer.ministriesLinks)
  footerMinistriesLinks!: Footer;

  @ManyToMany(() => Footer, (footer) => footer.legalLinks)
  footerLegalLinks!: Footer;
}
