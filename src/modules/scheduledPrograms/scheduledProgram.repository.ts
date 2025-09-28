import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { getDayOfWeekFromDate } from '../../utils/dayOfWeek';
import { ScheduledProgram } from './scheduledProgram.entity';

export class ScheduledProgramRepository {
  private repo: Repository<ScheduledProgram>;

  constructor() {
    this.repo = AppDataSource.getRepository(ScheduledProgram);
  }

  async findAll(): Promise<ScheduledProgram[]> {
    return this.repo.find();
  }

  async currentProgram(now: Date): Promise<ScheduledProgram | null> {
    const currentTime = now.toTimeString().slice(0, 8)
    const dayOfWeek = getDayOfWeekFromDate(now)
    return this.repo
      .createQueryBuilder("scheduledProgram")
      .where("scheduledDay = :dayOfWeek", { dayOfWeek })
      .andWhere("startTime >= :currentTime", { currentTime })
      .andWhere("endTime <= :currentTime", { currentTime })
      .getOne();
  }

  async getRecentScheduledPrograms(limit: number): Promise<ScheduledProgram[]> {
    return this.repo
      .createQueryBuilder('scheduledProgram')
      .orderBy("startDate", "DESC")
      .limit(limit)
      .getMany();
  }

  async getUpcomingServices(limit: number): Promise<ScheduledProgram[]> {
    return this.repo
      .createQueryBuilder('scheduledProgram')
      .addOrderBy(`CASE "scheduledProgram"."scheduledDay"
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          WHEN 'Saturday' THEN 6
          WHEN 'Sunday' THEN 7
          ELSE 8
        END`, 'ASC')
      .limit(limit)
      .getMany();
  }

  async findOne(id: number): Promise<ScheduledProgram | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(scheduledProgram: ScheduledProgram): Promise<ScheduledProgram> {
    return this.repo.save(scheduledProgram);
  }

  async update(scheduledProgram: ScheduledProgram): Promise<ScheduledProgram> {
    return this.repo.save(scheduledProgram);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
