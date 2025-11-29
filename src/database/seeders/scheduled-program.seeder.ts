
import { AppDataSource } from '../data-source';
import { ScheduledProgram } from '../../modules/scheduledPrograms/scheduledProgram.entity';
import { DayOfWeek } from '../../utils/dayOfWeek';

const scheduleProgramData = [
  {
    title: "Sunday Service",
    startTime: "10:30:00",
    scheduledDay: DayOfWeek.Sunday,
    endTime: "12:00:00",
    location: "Main Sanctuary",
    icon: "church",
  },
  {
    title: "Bible Study",
    startTime: "19:30:00",
    scheduledDay: DayOfWeek.Wednesday,
    endTime: "21:00:00",
    location: "Fellowship Hall",
    icon: "clock",
  },
];

export async function seedScheduledPrograms() {
  const programRepo = AppDataSource.getRepository(ScheduledProgram);
  for (const e of scheduleProgramData) {
    const event = programRepo.create(e);
    await programRepo.save(event);
  }
  console.log('Seeded Scheduled Programs successfully!');
}
