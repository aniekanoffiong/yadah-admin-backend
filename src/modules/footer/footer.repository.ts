import { Repository } from 'typeorm';
import { Footer } from './footer.entity';
import { AppDataSource } from '../../database/data-source';

export class FooterRepository {
  private repo: Repository<Footer>;

  constructor() {
    this.repo = AppDataSource.getRepository(Footer);
  }

  async findAll(): Promise<Footer[]> {
    return this.repo.find({ relations: ['socialLinks'] });
  }

  async findOne(id: number): Promise<Footer | null> {
    return this.repo.findOne({ where: { id }, relations: ['socialLinks'] });
  }

  async create(footer: Footer): Promise<Footer> {
    return this.repo.save(footer);
  }

  async update(footer: Footer): Promise<Footer> {
    return this.repo.save(footer);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
