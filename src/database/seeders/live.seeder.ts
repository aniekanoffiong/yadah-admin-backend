import { Live } from "../../modules/live/live.entity";
import { AppDataSource } from "../data-source";

const liveData = [
  {
    videoUrl: "https://www.youtube.com/watch?v=RQsyWxdMBu0",
    title: "EMERGENCE: THE RISE OF SAVIOURS || APOSTLE CHARLES",
    date: "2025-09-23",
    startTime: "18:30",
    endTime: "21:00",
    featured: false,
    isLive: false,
  },
];

export async function seedLive() {
  const liveRepo = AppDataSource.getRepository(Live);
  for (const data of liveData) {
    const live = liveRepo.create(data);
    await liveRepo.save(live);
  }
  console.log('Seeded Live');
}
