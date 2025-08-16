import { Repository } from 'typeorm';
import { Sermon } from './sermon.entity';
import { AppDataSource } from '../../database/data-source';

export class SermonRepository {
  private sermonRepo: Repository<Sermon>;

  constructor() {
    this.sermonRepo = AppDataSource.getRepository(Sermon);
  }

  async findAllSermons(): Promise<Sermon[]> {
    return this.sermonRepo.find();
  }

  async findOneSermon(id: number): Promise<Sermon | null> {
    return this.sermonRepo.findOne({ where: { id }});
  }

  async createSermon(sermon: Sermon): Promise<Sermon> {
    return this.sermonRepo.save(sermon);
  }

  async updateSermon(sermon: Sermon): Promise<Sermon> {
    return this.sermonRepo.save(sermon);
  }

  async deleteSermon(id: number): Promise<void> {
    await this.sermonRepo.delete(id);
  }
}
