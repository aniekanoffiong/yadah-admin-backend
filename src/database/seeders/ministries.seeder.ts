import { Ministry, MinistryActivity } from '../../modules/ministries/ministry.entity';
import { DayOfWeek } from '../../utils/dayOfWeek';
import { AppDataSource } from '../data-source';

const ministriesData = [
  {
    externalId: 'youth',
    gradient: "color-azure-60 color-violet-56",
    title: 'Youth Ministry',
    description: 'Empowering teenagers and young adults to discover their purpose in Christ through dynamic worship, relevant teaching, and authentic community.',
    scheduledDay: DayOfWeek.Friday,
    meetingTime: '18:00',
    location: 'Youth Center',
    leader: 'Pastor Sarah Johnson',
    participants: '35+ Active Members',
    activities: ['Youth Camp', 'Mission Trips', 'Bible Study', 'Sports & Games'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  {
    externalId: 'women',
    title: 'Women\'s Ministry',
    description: 'Empowering women to grow in their faith, build meaningful relationships, and impact their communities through service and outreach.',
    scheduledDay: DayOfWeek.Wednesday,
    meetingTime: '19:00',
    location: 'Community Room',
    leader: 'Pastor Sarah Johnson',
    participants: '20+ Active Members',
    activities: ['Women\'s Retreat', 'Community Service', 'Bible Study', 'Craft Nights'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  {
    externalId: 'worship',
    title: 'Worship Team',
    description: 'Leading the congregation in worship through music, song, and creative arts.',
    scheduledDay: DayOfWeek.Sunday,
    meetingTime: '08:00',
    location: 'Main Auditorium',
    leader: 'Pastor John Smith',
    participants: '15+ Active Members',
    activities: ['Worship Services', 'Music Practice', 'Creative Arts Workshops'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  {
    externalId: 'bible-study',
    title: 'Bible Study Group',
    description: 'Deepening our understanding of Scripture through group study and discussion.',
    scheduledDay: DayOfWeek.Thursday,
    meetingTime: '19:00',
    location: 'Library',
    leader: 'Pastor John Smith',
    participants: '17+ Active Members',
    activities: ['Bible Study Sessions', 'Discussion Groups', 'Guest Speakers'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  {
    externalId: 'children',
    title: 'Children\'s Ministry',
    description: 'Nurturing the faith of our children through age-appropriate teaching and activities.',
    scheduledDay: DayOfWeek.Sunday,
    meetingTime: '09:00',
    location: 'Children\'s Wing',
    leader: 'Pastor Emily Davis',
    participants: '30+ Active Members',
    activities: ['Bible Stories', 'Arts & Crafts', 'Games & Activities'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
  {
    externalId: 'outreach',
    title: 'Outreach Ministry',
    description: 'Reaching out to our community and beyond with the love of Christ through service and evangelism.',
    scheduledDay: DayOfWeek.Saturday,
    meetingTime: '10:00',
    location: 'Community Center',
    leader: 'Pastor Emily Davis',
    participants: '25+ Active Members',
    activities: ['Community Service', 'Evangelism Training', 'Outreach Events'],
    buttons: [
      { text: 'Join This Ministry', type: 'primary', icon: 'mail' },
      { text: 'Contact Leader', type: 'secondary', icon: 'mail' }
    ]
  },
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
