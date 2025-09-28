import { GrowInFaith } from "../../modules/growInFaith/growInFaith.entity";
import { AppDataSource } from "../data-source";

const growInFaithData = [
  {
    "title": "Growing in Faith and Expanding Impact",
    "description": "City of Yadah Church was founded in 2025 by a small group of families who felt called to create a place where faith could grow and community could thrive. What started as weekly gatherings in a local school has grown into a vibrant congregation of over 500 members.",
    "secondDescription": "During the pandemic, we innovated with online services reaching global audiences. We opened our second campus and launched 15 different ministry programs serving our community.",
    "image": "https://api.builder.io/api/v1/image/assets/TEMP/813bdc521ff65d31976008375b06f2dbe1a8efb4?width=1194",
    "buttonText": "Join Our Community",
    "buttonLink": "/ministries",
  }
];

export async function seedGrowInFaith() {
  const growInFaithRepository = AppDataSource.getRepository(GrowInFaith);
  for (const e of growInFaithData) {
    const data = growInFaithRepository.create(e);
    await growInFaithRepository.save(data);
  }
  console.log('Seeded growInFaith successfully!');
}
