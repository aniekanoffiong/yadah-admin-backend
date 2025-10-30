import { CallToAction, CTAAddedInfo, CTAButton } from '../../modules/cta/cta.entity';
import { SpecificPage, SpecificPageSection } from '../../utils/enums';
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
    "title": "Your Giving Impact",
    "subtitle": "Your generous giving helps us spread God's love, support our community, and advance His kingdom both locally and around the world.",
    "page": SpecificPage.HOME,
    "pageSection": SpecificPageSection.GIVING,
    "backgroundImage": "uploads/24a9f0b7713542aa4a817d18240c4d06e1df5e67.jpg",
    "addedInfo": [
      {
        "value": "500+",
        "description": "Families Supported"
      },
      {
        "value": "120",
        "description": "Mission Trips"
      },
      {
        "value": "200+",
        "description": "Youths and Teens impacted"
      },
      {
        "value": "10",
        "description": "New Programs"
      }
    ],
    "buttons": [
      {
        "text": "Give Today",
        "variant": "secondary",
        "url": "/give"
      },
      {
        "text": "Sponsor a Project",
        "variant": "tertiary",
        "url": "/contact?subject=ministry"
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
  {
    title: "Join Us",
    subtitle: "Take your next step with us. Whether you're exploring faith or looking to grow deeper, we have a place for you in our church family.",
    page: SpecificPage.CONTACT,
    "buttons": [
      {
        "text": "Join a Small Group",
        "variant": "primary",
        "icon": "calendar",
        "url": "/ministries"
      },
    ]
  },
  {
    title: "Wish to Get Involved with the Ministry",
    subtitle: "Take your next step with us. Whether you're exploring faith or looking to grow deeper, we have a place for you in our church family.",
    page: SpecificPage.PASTOR,
    buttons: [
      {
        "text": "Join a Small Group",
        "variant": "primary",
        "icon": "users",
        "url": "/ministries"
      },
      {
        "text": "Support Our Ministry",
        "variant": "secondary",
        "icon": "heart",
        "url": "/give"
      },
    ],
  },
  {
    title: "Questions? We're Here to Help",
    subtitle: "Our pastoral team is available to answer your questions about faith, baptism, membership, or anything else you'd like to know about Grace Community.",
    page: SpecificPage.SERMON,
    buttons: [
      {
        "text": "Contact a Pastor",
        "variant": "primary",
        "icon": "phone",
        "url": "/contact?subject=counselling"
      },
      {
        "text": "View all Events",
        "variant": "secondary",
        "icon": "calendar",
        "url": "/events"
      },
    ],
  },
  {
    title: "Ministry Journey, Focus & Vision",
    subtitle: "Discover where God is calling you to serve and make a lasting impact in the lives of others. Every ministry is an opportunity to grow, connect, and transform lives.",
    page: SpecificPage.PASTOR,
    pageSection: SpecificPageSection.PASTOR_DETAILS,
    buttons: [],
  },
];

export async function seedCallToAction() {
  const ctaRepo = AppDataSource.getRepository(CallToAction);
  const btnRepo = AppDataSource.getRepository(CTAButton);
  const infoRepo = AppDataSource.getRepository(CTAAddedInfo);

  for(let data of callToActionData) {
    const cta = ctaRepo.create({
      title: data.title,
      subtitle: data.subtitle,
      pageSection: data.pageSection,
      backgroundImage: data.backgroundImage,
      page: data.page
    });
    await ctaRepo.save(cta);

    for (const btn of data.buttons) {
      const button = btnRepo.create({ ...btn, callToAction: cta });
      await btnRepo.save(button);
    }
    if (data.addedInfo) {      
      for (const item of data.addedInfo) {
        const addedInfo = infoRepo.create({ ...item, callToAction: cta });
        await infoRepo.save(addedInfo);
      }
    }
  }
  console.log('Seeded CallToAction, CTAButtons & CTAAddedInfo');
}
