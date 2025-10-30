import { Hero } from '../../modules/hero/hero.entity';
import { SpecificPage } from '../../utils/enums';
import { AppDataSource } from '../data-source';

const heroData = [
  {
    page: SpecificPage.HOME,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/2bcbb4495b901fec7f6c0d07609652a829ac1170?width=2880',
    video: 'https://yadah.co.uk/wp-content/uploads/2024/09/latest.m4v',
    title: 'City of Yadah',
    subtitle: '...Jesus revealed, Nations United',
    showControls: false,
    volunteerProgramText: 'Join Our Volunteer Program',
    volunteerProgramLink: '/volunteer',
  },
  {
    page: SpecificPage.GALLERY,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2Fc4ba81904f8b4b6a863f5f03b28bca5c?format=webp&width=800',
    title: 'Communion Praise and Worship Section',
    subtitle: null,
    showControls: true,
  },
  {
    page: SpecificPage.ABOUT,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/129452b8ea8c149a4bd1660f00765269944addb5?width=2880',
    title: 'Why We Exist',
    subtitle: "Our purpose drives everything we do, guiding us in our mission to impact lives and communities for Christ.",
    showControls: false,
  },
  {
    page: SpecificPage.CONTACT,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2F5ffe6a68909246cd977f72a6c9104aa9?format=webp&width=800',
    title: 'Contact Us',
    subtitle: "We'd love to hear from you! Reach out with questions, prayer requests, or to learn more about our church family.",
    showControls: false,
  },
  {
    page: SpecificPage.MINISTRY,
    title: "Discover Your Ministry Calling",
    subtitle: "Become all God ordained for you... discover the uniqueness of God's call on your life",
    image: "https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2Fa7fb664fc8694d8fa2560a42a85d9d24?format=webp&width=800",
    buttons: [
      { text: "Join as a Member", type: "primary", href: "/join" },
      { text: "Watch Us Live", type: "secondary", href: "/live", icon: "play" }
    ]
  },
  {
    page: SpecificPage.GIVE,
    title: "Give to Support our Ministry",
    subtitle: "Your generous giving helps us spread God's love, support our community, and advance His kingdom both locally and around the world.",
    image: "",
  },
  {
    page: SpecificPage.PASTOR,
    title: "Meet Our Pastor",
    subtitle: "Guided by Faith, Leading with Love",
    image: "",
  },
  {
    page: SpecificPage.EVENT,
    title: "Events and Programs",
    subtitle: "Join us for special services, fellowship opportunities, and community outreach events that bring us together in faith and service.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1440&h=600&fit=crop&crop=center",
  },
];

export async function seedHeroes() {
  const heroRepo = AppDataSource.getRepository(Hero);
  for (const h of heroData) {
    const hero = heroRepo.create(h);
    await heroRepo.save(hero);
  }
  console.log('Seeded Heroes for pages');
}
