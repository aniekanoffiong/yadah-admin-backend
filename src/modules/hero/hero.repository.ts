import { Repository } from 'typeorm';
import { Hero } from './hero.entity';
import { AppDataSource } from '../../database/data-source';

export class HeroRepository {
  private repo: Repository<Hero>;

  constructor() {
    this.repo = AppDataSource.getRepository(Hero);
  }

  async findAll(): Promise<Hero[]> {
    return this.repo.find();
  }

  async findByPage(page: string): Promise<Hero | null> {
    return this.repo.findOne({ where: { page } });
  }

  async findOne(id: number): Promise<Hero | null | undefined> {
    return this.repo.findOne({ where: { id }});
  }

  async create(hero: Hero): Promise<Hero> {
    return this.repo.save(hero);
  }

  async update(hero: Hero): Promise<Hero> {
    return this.repo.save(hero);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
