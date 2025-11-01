import { Footer } from '../../modules/footer/footer.entity';
import { SocialLink } from '../../modules/social/social.entity';
import { AppDataSource } from '../data-source';
import { SiteLink } from '../../modules/siteLinks/siteLink.entity';
import { Platform } from '../../utils/enums';

const footerData = {
  newsletterTitle: 'We are City of Yadah',
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
  ],
  ministries: [
    {
      label: 'Children\'s Ministry',
      url: '/ministries?category=children'
    },
    {
      label: 'Youth Ministry',
      url: '/ministries?category=youth'
    },
    {
      label: 'Small Groups',
      url: '/ministries?category=small-groups'
    },
    {
      label: 'Community Outreach',
      url: '/ministries?category=community-outreach'
    },
    {
      label: 'Bible Studies',
      url: '/ministries?category=bible-studies'
    },
    {
      label: 'Worship Team',
      url: '/ministries?category=worship-team'
    }
  ],
  address: 'Bournemouth Carlton Hotel, East Over Cliff Grove Rd, bh1 3dn.',
  phone: '+447985533064',
  email: 'info@cityofyadah.co.uk',
  schedule: { sunday: 'Sunday Service: 10:30 AM', wednesday: 'Bible Study: Wed 7:00 PM' },
  legalLinks: [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' },
    { label: 'Cookies Settings', url: '#' },
  ],
  copyright: 'Copyright © {year} City of Yadah. All Rights Reserved.',
  socialLinks: [
    { url: 'https://www.instagram.com/cityofyadah_/', icon: 'instagram', platform: Platform.INSTAGRAM, name: 'instagram' },
    { url: 'https://www.youtube.com/@CityofYadah/streams', icon: 'youtube', platform: Platform.YOUTUBE, name: 'youtube' }
  ],
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
      footerQuickLinks: [footer],
    });
    await siteLinkRepo.save(siteLink);
  }

  for (const link of ministries) {
    const siteLink = siteLinkRepo.create({
      ...link,
      footerMinistriesLinks: [footer],
    });
    await siteLinkRepo.save(siteLink);
  }

  for (const link of legalLinks) {
    const siteLink = siteLinkRepo.create({
      ...link,
      footerLegalLinks: [footer],
    });
    await siteLinkRepo.save(siteLink);
  }

  console.log('Seeded Footer, Social Links, and Site Links');
}
