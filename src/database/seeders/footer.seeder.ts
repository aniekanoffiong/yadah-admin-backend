import { url } from 'inspector';
import { Footer } from '../../modules/footer/footer.entity';
import { SocialLink } from '../../modules/social/social.entity';
import { AppDataSource } from '../data-source';
import { SiteLink } from '../../modules/siteLinks/siteLink.entity';

const footerData = {
  newsletterTitle: 'Welcome to the Yadah family',
  newsletterSubtitle: "We are glad to share our lives with you...",
  logoSrc: 'https://api.builder.io/api/v1/image/assets/TEMP/8e2476537d97037d4cff80a59722a04edd589e7e?width=128',
  logoAlt: 'City of Yadah Logo',
  description: 'A place where faith grows, community thrives, and everyone belongs.',
  quickLinks: [
    {
      label: 'Give to Serve',
      url: '/give'
    },
    {
      label: 'About Us',
      url: '/about'
    },
    {
      label: 'Sermons',
      url: '/sermons'
    },
    {
      label: 'Events',
      url: '/events'
    },
    {
      label: 'Contact',
      url: '/contact'
    },
    {
      label: 'Gallery',
      url: '/gallery'
    }
  ],
  ministries: [
    {
      label: 'Children\'s Ministry',
      url: '/ministries'
    },
    {
      label: 'Youth Ministry',
      url: '/ministries'
    },
    {
      label: 'Small Groups',
      url: '/ministries'
    },
    {
      label: 'Community Outreach',
      url: '/ministries'
    },
    {
      label: 'Bible Studies',
      url: '/ministries'
    },
    {
      label: 'Worship Team',
      url: '/ministries'
    }
  ],
  address: 'Bournemouth Carlton Hotel, East Over Cliff Grove Rd, bh1 3dn.',
  phone: '+447985533064',
  email: 'info@yadah.co.uk',
  schedule: { sunday: 'Sunday Service: 10:30 AM', wednesday: 'Bible Study: Wed 7:00 PM' },
  legalLinks: [
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms of Service', url: '/terms-of-service' },
    { label: 'Cookies Settings', url: '/cookies-settings' },
  ],
  copyright: 'Copyright © 2025 Yadah.co.uk. All Rights Reserved.',
  socialLinks: [
    { url: '#', icon: 'facebook', platform: 'facebook', name: 'facebook' },
    { url: '#', icon: 'instagram', platform: 'instagram', name: 'instagram' },
    { url: '#', icon: 'tiktok', platform: 'tiktok', name: 'tiktok' },
    { url: '#', icon: 'youtube', platform: 'youtube', name: 'youtube' }
  ]
};

export async function seedFooter() {
  const footerRepo = AppDataSource.getRepository(Footer);
  const socialRepo = AppDataSource.getRepository(SocialLink);
  const siteLinkRepo = AppDataSource.getRepository(SiteLink);
  const { legalLinks, quickLinks, ministries, socialLinks, ...rest } = footerData;
  const footer = footerRepo.create(rest);
  await footerRepo.save(footer);

  for (const social of socialLinks) {
    let socialAccount = await socialRepo.findOneBy({
      platform: social.platform
    });
    if (!socialAccount) {
      socialAccount = socialRepo.create({
        ...social,
        footers: [footer],
      });
    } else {
      socialAccount.footers = [...(socialAccount.footers || []), footer];
    }
    await socialRepo.save(socialAccount);
  }

  for (const link of quickLinks) {
    const siteLink = siteLinkRepo.create({
      ...link,
      footerQuickLinks: footer,
    });
    await siteLinkRepo.save(siteLink);
  }

  for (const link of ministries) {
    const siteLink = siteLinkRepo.create({
      ...link,
      footerMinistriesLinks: footer,
    });
    await siteLinkRepo.save(siteLink);
  }

  for (const link of legalLinks) {
    const siteLink = siteLinkRepo.create({
      ...link,
      footerLegalLinks: footer,
    });
    await siteLinkRepo.save(siteLink);
  }

  console.log('Seeded Footer, Social Links, and Site Links');
}
