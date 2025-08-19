import { AppDataSource } from '../data-source';
import { GalleryItem } from '../../modules/gallery/gallery.entity';
import { ItemTag } from '../../modules/itemTag/itemTag.entity';

// From gallerypage.json images array (some sample entries)
const galleryItemsData = [
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/f3f016a85455ab4193763f92f4a2724528e80fe8?width=779',
    alt: 'Church service moment',
    caption: 'Sunday Morning Worship Service',
    category: 'faith',
    tags: [
      'worship',
      'community'
    ],
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/ac60952421c943dc8efd52b32e9c5a63a77bb1d2?width=779',
    alt: 'Community gathering',
    caption: 'Community Fellowship Gathering',
    category: 'fellowship',
    tags: [
      'community',
      'fellowship'
    ],
  },
];

export async function seedGalleryItems() {
  const repo = AppDataSource.getRepository(GalleryItem);
  const tagRepo = AppDataSource.getRepository(ItemTag);

  for (const item of galleryItemsData) {
    // Find or create tags
    const tags: ItemTag[] = [];
    for (const tagLabel of item.tags) {
      let tag = await tagRepo.findOne({ where: { label: tagLabel } });
      if (!tag) {
        tag = tagRepo.create({ label: tagLabel });
        await tagRepo.save(tag);
      }
      tags.push(tag);
    }
    const entity = repo.create({ ...item, tags });
    await repo.save(entity);
  }
  console.log('Seeded Gallery Items');
}
