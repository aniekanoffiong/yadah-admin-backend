import { AppDataSource } from '../data-source';
import { ContactInfo } from '../../modules/contact/contact.entity';
import { Platform } from '../../utils/enums';

const contactData = {
  title: 'Find Us',
  subtitle: "We're located in the heart of Bournemouth",
  address: 'Bournemouth Carlton Hotel, East Over Cliff Grove Rd, bh1 3dn.',
  email: 'info@cityofyadah.co.uk',
  mapAddress: 'https://maps.app.goo.gl/V3eZb97x5vy7NRgG6',
  phones: ['+447985533064'],
  latLong: [50.719079081019814, -1.8651422389807533],
  socialPlatforms: [
    {
      platform: Platform.INSTAGRAM,
      url: 'https://www.instagram.com/cityofyadah_/',
      icon: 'instagram',
    },
    {
      platform: Platform.YOUTUBE,
      url: 'https://www.youtube.com/@CityofYadah/streams',
      icon: 'youtube',
    },
  ],
};

export async function seedContactInfo() {
  const repo = AppDataSource.getRepository(ContactInfo);
  const contactInfo = repo.create(contactData);
  await repo.save(contactInfo);
  console.log('Seeded ContactInfo');
}
