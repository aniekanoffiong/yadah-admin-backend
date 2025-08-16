import { Repository } from 'typeorm';
import { Pastor, Achievement, MinistryFocus } from './pastor.entity';
import { AppDataSource } from '../../database/data-source';

export class PastorRepository {
  private pastorRepo: Repository<Pastor>;
  private achievementRepo: Repository<Achievement>;
  private ministryFocusRepo: Repository<MinistryFocus>;

  constructor() {
    this.pastorRepo = AppDataSource.getRepository(Pastor);
    this.achievementRepo = AppDataSource.getRepository(Achievement);
    this.ministryFocusRepo = AppDataSource.getRepository(MinistryFocus);
  }

  async findAll(): Promise<Pastor[]> {
    return this.pastorRepo.find({ relations: ['achievements', 'ministry'] });
  }

  async findOne(id: number): Promise<Pastor | null> {
    return this.pastorRepo.findOne({ where: { id }, relations: ['achievements', 'ministry'] });
  }

  async create(pastor: Pastor): Promise<Pastor> {
    return this.pastorRepo.save(pastor);
  }

  async update(pastor: Pastor): Promise<Pastor> {
    return this.pastorRepo.save(pastor);
  }

  async delete(id: number): Promise<void> {
    await this.pastorRepo.delete(id);
  }

  async deleteAchievementsByPastorId(pastorId: number): Promise<void> {
    await this.achievementRepo.delete({ pastor: { id: pastorId } });
  }
}
