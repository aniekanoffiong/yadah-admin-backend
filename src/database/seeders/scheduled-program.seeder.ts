
import { AppDataSource } from '../data-source';
import { ScheduledProgram } from '../../modules/scheduledPrograms/scheduledProgram.entity';

const scheduleProgramData = [
  {
    title: "Sunday Service",
    schedule: "Every Sunday",
    startTime: "10:30:00",
    endTime: "12:00:00",
    location: "Main Sanctuary",
    icon: "church",
  },
  {
    title: "Bible Study",
    schedule: "Every Wednesday",
    startTime: "19:30:00",
    endTime: "21:00:00",
    location: "Fellowship Hall",
    icon: "clock",
  },
  {
    title: "Youth Service",
    schedule: "Every Friday",
    startTime: "18:00:00",
    endTime: "20:00:00",
    location: "Youth Center",
    icon: "users",
  },
  {
    title: "Community Service",
    schedule: "Every Saturday",
    startTime: "07:00:00",
    endTime: "10:00:00",
    location: "Community Center",
    icon: "family",
  },
  {
    title: "Mission Movement",
    schedule: "First Saturdays",
    startTime: "11:00:00",
    endTime: "06:00:00",
    location: "Community Center",
  }
];

export async function seedScheduledPrograms() {
  const programRepo = AppDataSource.getRepository(ScheduledProgram);
  for (const e of scheduleProgramData) {
    const event = programRepo.create(e);
    await programRepo.save(event);
  }
  console.log('Seeded Scheduled Programs successfully!');
}
