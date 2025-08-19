import { AppDataSource } from '../data-source';
import { ContactInfo } from '../../modules/contact/contact.entity';

const contactData = {
  title: 'Find Us',
  subtitle: "We're located in the heart of Argyll Road...",
  address: '21 Argyll Road',
  email: 'info@yadah.co.uk',
  phones: ['+447985533064', '01-7649028'],
  socialPlatforms: [
    {
      platform: 'facebook',
      url: '#',
      icon: 'facebook',
    },
    {
      platform: 'instagram',
      url: '#',
      icon: 'instagram',
    },
    {
      platform: 'youtube',
      url: '#',
      icon: 'youtube',
    },
    {
      platform: 'tiktok',
      url: '#',
      icon: 'tiktok',
    },
  ],
};

export async function seedContactInfo() {
  const repo = AppDataSource.getRepository(ContactInfo);
  const contactInfo = repo.create(contactData);
  await repo.save(contactInfo);
  console.log('Seeded ContactInfo');
}
