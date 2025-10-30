import { AppDataSource } from '../../database/data-source';
import { Repository } from 'typeorm';
import { ContactMessage } from './contactMessage.entity';

export class ContactMessageRepository {
  private repo: Repository<ContactMessage>;

  constructor() {
    this.repo = AppDataSource.getRepository(ContactMessage);
  }

  async create(message: ContactMessage): Promise<ContactMessage> {
    return this.repo.save(message);
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<ContactMessage | null> {
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
