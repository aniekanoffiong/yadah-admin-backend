import { Hero } from '../../modules/hero/hero.entity';
import { SpecificPage } from '../../utils/enums';
import { AppDataSource } from '../data-source';

const heroData = [
  {
    page: SpecificPage.HOME,
    backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/2bcbb4495b901fec7f6c0d07609652a829ac1170?width=2880',
    title: 'Welcome To Yadah',
    subtitle: 'A place where faith grows, community thrives, and everyone belongs. Join us for worship, fellowship, and life-changing encounters with God.',
    showControls: false,
    volunteerProgramText: 'Join Our Volunteer Program',
    volunteerProgramLink: '/volunteer',
  },
  {
    page: SpecificPage.GALLERY,
    backgroundImage: 'https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2Fc4ba81904f8b4b6a863f5f03b28bca5c?format=webp&width=800',
    title: 'Communion Praise and Worship Section',
    subtitle: null,
    showControls: true,
  },
  {
    page: SpecificPage.ABOUT,
    backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/129452b8ea8c149a4bd1660f00765269944addb5?width=2880',
    title: 'Why We Exist',
    subtitle: "Our purpose drives everything we do, guiding us in our mission to impact lives and communities for Christ.",
    showControls: false,
  },
  {
    page: SpecificPage.CONTACT,
    backgroundImage: 'https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2F5ffe6a68909246cd977f72a6c9104aa9?format=webp&width=800',
    title: 'Contact Us',
    subtitle: "We'd love to hear from you! Reach out with questions, prayer requests, or to learn more about our church family.",
    showControls: false,
  },
  {
    page: SpecificPage.MINISTRY,
    title: "Discover Your Ministry Calling",
    subtitle: "Acme makes running global teams simple. HR, Payroll, International Employment, contractor management and more.",
    backgroundImage: "https://cdn.builder.io/api/v1/image/assets%2F7623954293324d3290a21d8b4b503517%2Fa7fb664fc8694d8fa2560a42a85d9d24?format=webp&width=800",
    buttons: [
      { text: "Join as a Member", type: "primary", href: "/join" },
      { text: "Watch Us Live", type: "secondary", href: "/live", icon: "play" }
    ]
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
