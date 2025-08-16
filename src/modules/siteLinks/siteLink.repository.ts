import { Repository } from 'typeorm';
import { SiteLink } from './siteLink.entity';
import { AppDataSource } from '../../database/data-source';

export class SiteLinkRepository {
  private repo: Repository<SiteLink>;

  constructor() {
    this.repo = AppDataSource.getRepository(SiteLink);
  }

  async findAll(): Promise<SiteLink[]> {
    return this.repo.find({ relations: ['footers', 'contacts'] });
  }

  async findOne(id: number): Promise<SiteLink | null> {
    return this.repo.findOne({ where: { id }, relations: ['footers', 'contacts'] });
  }

  async create(siteLink: SiteLink): Promise<SiteLink> {
    return this.repo.save(siteLink);
  }

  async update(siteLink: SiteLink): Promise<SiteLink> {
    return this.repo.save(siteLink);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
