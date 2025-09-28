import { CallToAction, CTAButton } from '../../modules/cta/cta.entity';
import { SpecificPage } from '../../utils/enums';
import { AppDataSource } from '../data-source';

const callToActionData = [
  {
    title: 'Ready to Visit or Get Involved?',
    subtitle: 'Take your next step with us...',
    page: SpecificPage.HOME,
    buttons: [
      { text: "Let's Plan Your Visit", variant: 'primary', icon: 'calendar', url: "/contact" },
      { text: 'Join a Small Group', variant: 'secondary', icon: 'users', url: "/ministries" }
    ]
  },
  {
    "title": "Ready to Visit or Get Involved?",
    "subtitle": "Take your next step with us. Whether you're exploring faith or looking to grow deeper, we have a place for you in our church family.",
    page: SpecificPage.ABOUT,
    "buttons": [
      {
        "text": "Let's Plan Your Visit",
        "variant": "primary",
        "icon": "calendar",
        "url": "/contact"
      },
      {
        "text": "Join a Small Group",
        "variant": "secondary",
        "icon": "users",
        "url": "/ministries"
      }
    ]
  },
  {
    title: "Join Us",
    subtitle: "Visit us in person for the full worship experience",
    page: SpecificPage.WATCH_LIVE,
    "buttons": [
      {
        "text": "Let's Plan Your Visit",
        "variant": "primary",
        "icon": "calendar",
        "url": "/contact"
      },
    ]
  },
];

export async function seedCallToAction() {
  const ctaRepo = AppDataSource.getRepository(CallToAction);
  const btnRepo = AppDataSource.getRepository(CTAButton);

  for(let data of callToActionData) {
    const cta = ctaRepo.create({
      title: data.title,
      subtitle: data.subtitle,
      page: data.page
    });
    await ctaRepo.save(cta);

    for (const btn of data.buttons) {
      const button = btnRepo.create({ ...btn, callToAction: cta });
      await btnRepo.save(button);
    }
  }
  console.log('Seeded CallToAction and CTAButtons');
}
