import { Repository } from 'typeorm';
import { Ministry, MinistryActivity } from './ministry.entity';
import { AppDataSource } from '../../database/data-source';

export class MinistryRepository {
  private ministryRepo: Repository<Ministry>;
  private activityRepo: Repository<MinistryActivity>;

  constructor() {
    this.ministryRepo = AppDataSource.getRepository(Ministry);
    this.activityRepo = AppDataSource.getRepository(MinistryActivity);
  }

  async findAll(): Promise<Ministry[]> {
    return this.ministryRepo.find({ relations: ['activities'] });
  }

  async findOne(id: number): Promise<Ministry | null> {
    return this.ministryRepo.findOne({ where: { id }, relations: ['activities'] });
  }

  async create(ministry: Ministry): Promise<Ministry> {
    return this.ministryRepo.save(ministry);
  }

  async update(ministry: Ministry): Promise<Ministry> {
    return this.ministryRepo.save(ministry);
  }

  async delete(id: number): Promise<void> {
    await this.ministryRepo.delete(id);
  }

  async deleteActivitiesByMinistryId(ministryId: number): Promise<void> {
    await this.activityRepo.delete({ ministry: { id: ministryId } });
  }
}
