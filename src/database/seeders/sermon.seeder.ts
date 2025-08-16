import { ItemTag } from '../../modules/itemTag/itemTag.entity';
import { Sermon } from '../../modules/sermon/sermon.entity';
import { AppDataSource } from '../data-source';

const sermonsData = [
  {
    title: 'Hope in Difficult Times',
    minister: 'Pastor Sarah Johnson',
    date: new Date('2024-11-24'),
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/sermon1?width=604',
    duration: '42:15',
    videoUrl: '#',
    tags: [
      'hope',
      'faith',
      'perseverance'
    ]
  },
  // add other sermons as per data...
];

export async function seedSermons() {
  const repo = AppDataSource.getRepository(Sermon);
  const tagRepo = AppDataSource.getRepository(ItemTag);
  for (const sermon of sermonsData) {
    const tags: ItemTag[] = [];
    for (const tagLabel of sermon.tags) {
      let tag = await tagRepo.findOne({ where: { label: tagLabel } });
      if (!tag) {
        tag = tagRepo.create({ label: tagLabel });
        await tagRepo.save(tag);
      }
      tags.push(tag);
    }

    await repo.save(repo.create({ ...sermon, tags }));
  }
  console.log('Seeded Sermons');
}
