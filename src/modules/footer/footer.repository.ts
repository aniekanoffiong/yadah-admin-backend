import { Repository } from 'typeorm';
import { Footer } from './footer.entity';
import { AppDataSource } from '../../database/data-source';

export class FooterRepository {
  private repo: Repository<Footer>;

  constructor() {
    this.repo = AppDataSource.getRepository(Footer);
  }

  async findOne(): Promise<Footer | null> {
    return this.repo.findOne({ relations: ['socialLinks'] });
  }

  async create(footer: Footer): Promise<Footer> {
    return this.repo.save(footer);
  }

  async update(footer: Footer): Promise<Footer> {
    return this.repo.save(footer);
  }
}
