import { Ministry, MinistryActivity } from '../../modules/ministries/ministry.entity';
import { AppDataSource } from '../data-source';

const ministriesData = [
  {
    externalId: 'youth',
    title: 'Youth Ministry',
    description: 'Empowering teenagers and young adults to discover their purpose in Christ through dynamic worship, relevant teaching, and authentic community.',
    meetingTime: 'Fridays 6:00 PM',
    location: 'Youth Center',
    leader: 'Pastor Sarah Johnson',
    participants: '200+ Active Members',
    activities: ['Youth Camp', 'Mission Trips', 'Bible Study', 'Sports & Games'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  // Add other ministries similarly...
];

export async function seedMinistries() {
  const ministryRepo = AppDataSource.getRepository(Ministry);
  const ministryActivityRepo = AppDataSource.getRepository(MinistryActivity);

  for (const data of ministriesData) {
    const ministry = ministryRepo.create({
      title: data.title,
      description: data.description,
      meetingTime: data.meetingTime,
      location: data.location,
      leader: data.leader,
      members: data.participants,
    });
    const savedMinstry = await ministryRepo.save(ministry);
    const activities = data.activities.map(activityName => {
      const activity = ministryActivityRepo.create({
        activityName,
        ministry: savedMinstry
      });
      return activity;
    });
    await ministryActivityRepo.save(activities);
  }
  console.log('Seeded Ministries with Activities');
}
