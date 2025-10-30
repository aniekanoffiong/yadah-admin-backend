import { Pastor, Achievement, MinistryFocus, MinistryJourneyItem } from '../../modules/pastor/pastor.entity';
import { AppDataSource } from '../data-source';

const pastorData = {
  image: 'uploads/apostle-uduak-charles.jpg',
  slug: 'apostle-uduak-charles',
  role: 'Lead Pastor',
  isLeadPastor: true,
  name: 'Apostle Uduak Charles',
  about: "Apostle Uduak Charles has served City of Yadah, guiding our congregation with a deep commitment to spiritual growth and community outreach. He leads with compassion, clarity, and a heart for discipleship equipping believers to live out the Gospel in everyday life. His ministry spans preaching, leadership development, and missions with a strong emphasis on prayer and the presence of God.",
  description: 'A visionary leader with a heart for God\'s people and a passion for building Christ-centered communities that transform lives.',
  quote: '"My greatest joy is seeing lives transformed by the love of Christ and watching our church family grow in faith, hope, and purpose."',
  achievements: [
    { icon: 'star', text: '12+ Years Ministry Experience' },
    { icon: 'book', text: 'Author of 2 Bestselling Books' },
    { icon: 'users', text: 'Mentored 150+ Church Leaders' }
  ],
  focusTitle: 'Ministry Focus',
  focusContent: 'Apostle Charles\' ministry focuses on equipping believers for effective service, building strong families, and developing leaders who will impact their communities for Christ. His teaching ministry emphasizes practical faith and spiritual growth.',
  others: "Outside ministry, Pastor Smith enjoys hiking, playing guitar, and spending time with his wife Mary and their three children. As a family, they value hospitality, prayer, and living out the love of Christ in everyday moments.",
  journey: [
    {
      year: 2005,
      title: 'Faith Roots',
      subtitle: 'Early Life',
      content: 'Born into a God-fearing home, Apostle Charles\' early years were marked by a deep love for Scripture and a desire to serve others.'
    },
    {
      year: 2012,
      title: 'The Call to Ministry',
      subtitle: 'Calling',
      content: 'During a youth retreat, he sensed a clear call to pastoral ministry and committed his life to preaching the Gospel.'
    },
    {
      year: 2017,
      title: 'Education & Preparation',
      subtitle: 'Training',
      content: 'He pursued theological training and pastoral mentorship, focusing on leadership, missions, and expository preaching.'
    },
    {
      year: 2022,
      title: 'Ministry Highlights',
      subtitle: 'Highlight',
      content: 'From city outreaches to international missions, Apostle Charles has seen God touch lives through simple, faithful ministry.'
    },
    {
      year: 2025,
      title: 'Serving at City of Yadah',
      subtitle: 'Today',
      content: 'For over 3 years at City of Yadah, he has guided the congregation toward spiritual maturity and community impact.'
    },
  ],
  focusItems: [
    {
      title: 'Preaching & Teaching',
      content: 'Biblically grounded messages that transform lives.'
    },
    {
      title: 'Mentoring Leaders',
      content: 'Raising leaders who serve with humility and excellence.',
    },
    {
      title: 'Community Outreach',
      content: 'Hands-on love through practical community support.',
    },
  ]
};

export async function seedPastor() {
  const ministryFocusRepo = AppDataSource.getRepository(MinistryFocus);
  const pastorRepo = AppDataSource.getRepository(Pastor);
  const achievementRepo = AppDataSource.getRepository(Achievement);
  const ministryJourneyItemRepo = AppDataSource.getRepository(MinistryJourneyItem);

  const pastor = pastorRepo.create({
    image: pastorData.image,
    slug: pastorData.slug,
    role: pastorData.role,
    name: pastorData.name,
    about: pastorData.about,
    description: pastorData.description,
    focusTitle: pastorData.focusTitle,
    focusContent: pastorData.focusContent,
    others: pastorData.others,
    quote: pastorData.quote,
    isLeadPastor: pastorData.isLeadPastor,
  });
  await pastorRepo.save(pastor);

  for (const ach of pastorData.achievements) {
    const achievement = achievementRepo.create({ ...ach, pastor });
    await achievementRepo.save(achievement);
  }

  for (const item of pastorData.journey) {
    const journeyItem = ministryJourneyItemRepo.create({ ...item, pastor });
    await ministryJourneyItemRepo.save(journeyItem);
  }

  for (const focusItem of pastorData.focusItems) {
    const focus = ministryFocusRepo.create({ ...focusItem, pastor });
    await ministryFocusRepo.save(focus);
  }

  console.log('Seeded Pastor, Achievements, MinistryFocus and Journey Items');
}
