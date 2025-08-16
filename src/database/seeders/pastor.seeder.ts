import { Pastor, Achievement, MinistryFocus } from '../../modules/pastor/pastor.entity';
import { AppDataSource } from '../data-source';

const pastorData = {
  image: 'https://api.builder.io/api/v1/image/assets/TEMP/a5bececf60608166882b14e0af831d25c0ca5fa3?width=1520',
  role: 'General Overseer',
  name: 'Apostle Uduak Charles',
  description: 'A visionary leader with a heart for God\'s people...',
  quote: 'My greatest joy is seeing lives transformed...',
  achievements: [
    { icon: 'star', text: '25+ Years Ministry Experience' },
    { icon: 'book', text: 'Author of 5 Bestselling Books' },
    { icon: 'users', text: 'Mentored 500+ Church Leaders' }
  ],
  ministry: {
    title: 'Ministry Focus',
    content: 'Pastor David\'s ministry focuses on equipping believers...'
  }
};

export async function seedPastor() {
  const ministryFocusRepo = AppDataSource.getRepository(MinistryFocus);
  const pastorRepo = AppDataSource.getRepository(Pastor);
  const achievementRepo = AppDataSource.getRepository(Achievement);

  const ministryFocus = ministryFocusRepo.create(pastorData.ministry);
  await ministryFocusRepo.save(ministryFocus);

  const pastor = pastorRepo.create({
    image: pastorData.image,
    role: pastorData.role,
    name: pastorData.name,
    description: pastorData.description,
    quote: pastorData.quote,
    ministry: ministryFocus,
  });
  await pastorRepo.save(pastor);

  for (const ach of pastorData.achievements) {
    const achievement = achievementRepo.create({ ...ach, pastor });
    await achievementRepo.save(achievement);
  }

  console.log('Seeded Pastor, Achievements and MinistryFocus');
}
