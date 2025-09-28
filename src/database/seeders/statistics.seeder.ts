import { Statistics } from '../../modules/statistics/statistics.entity';
import { AppDataSource } from '../data-source';

const statisticsData = [
  {
    backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/sermon1?width=604',
    stats: []
  },
];

export async function seedStatistics() {
  const repo = AppDataSource.getRepository(Statistics);
  for (const statistics of statisticsData) {
    await repo.save(repo.create(statistics));
  }
  console.log('Seeded Statistics');
}
  