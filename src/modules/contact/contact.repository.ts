import { Repository } from 'typeorm';
import { ContactInfo } from './contact.entity';
import { AppDataSource } from '../../database/data-source';

export class ContactInfoRepository {
  private repo: Repository<ContactInfo>;

  constructor() {
    this.repo = AppDataSource.getRepository(ContactInfo);
  }

  async find(): Promise<ContactInfo | null> {
    return this.repo.findOne({ where: { id: 1 }, relations: ["socialPlatforms"] });
  }

  async create(contactInfo: ContactInfo): Promise<ContactInfo> {
    return this.repo.save(contactInfo);
  }

  async update(contactInfo: ContactInfo): Promise<ContactInfo> {
    return this.repo.save(contactInfo);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
