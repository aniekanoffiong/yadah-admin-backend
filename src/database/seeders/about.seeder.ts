import { About, Story, StoryStat, Values, ValueItem } from '../../modules/about/about.entity';
import { AppDataSource } from '../data-source';

const aboutData = {
  mainTitle: "We're More Than Just a Church,",
  highlightedTitle: "We're a Movement.",
  description: "At Yadah Church, we believe...",
  story: {
    title: 'Our Story',
    content: 'What started as a small gathering...',
    stats: [
      { text: '5,000+ Lives Touched' },
      { text: '25+ Community Programs' },
      { text: '15+ Years of Service' },
      { text: '50+ Mission Trips' }
    ]
  },
  values: {
    title: 'What Drives Us',
    subtitle: 'Our core values shape everything we do...',
    items: [
      {
        icon: 'heart',
        title: 'Love in Action',
        description: "We demonstrate God's love..."
      },
      {
        icon: "users",
        title: "Authentic Community",
        description: "Building real relationships where people can be themselves and grow together."
      },
      {
        icon: "globe",
        title: "Global Impact",
        description: "Making a difference both locally and around the world through mission and service."
      },
      {
        icon: "zap",
        title: "Life Transformation",
        description: "Experiencing the power of God to change lives, families, and communities."
      }
    ]
  }
};

export async function seedAboutSection() {
  const aboutRepo = AppDataSource.getRepository(About);
  const storyRepo = AppDataSource.getRepository(Story);
  const storyStatRepo = AppDataSource.getRepository(StoryStat);
  const valuesRepo = AppDataSource.getRepository(Values);
  const valueItemRepo = AppDataSource.getRepository(ValueItem);

  // Create Story and its stats
  const story = storyRepo.create({
    title: aboutData.story.title,
    content: aboutData.story.content,
  });
  await storyRepo.save(story);

  for (const stat of aboutData.story.stats) {
    const statEntity = storyStatRepo.create({ text: stat.text, story });
    await storyStatRepo.save(statEntity);
  }

  // Create Values and value items
  const values = valuesRepo.create({
    title: aboutData.values.title,
    subtitle: aboutData.values.subtitle,
  });
  await valuesRepo.save(values);

  for (const item of aboutData.values.items) {
    const valueItem = valueItemRepo.create({ ...item, values });
    await valueItemRepo.save(valueItem);
  }

  // Create About with Story and Values
  const about = aboutRepo.create({
    mainTitle: aboutData.mainTitle,
    highlightedTitle: aboutData.highlightedTitle,
    description: aboutData.description,
    story,
    values,
  });
  await aboutRepo.save(about);

  console.log('Seeded About section with Story stats and Values');
}
