import { In, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { AppDataSource } from '../../../database/data-source';

export class RoleRepository {
  private repo: Repository<Role>;

  constructor() {
    this.repo = AppDataSource.getRepository(Role);
  }

  async findById(id: number): Promise<Role | null> {
    return this.repo.findOne({ where: { id }, relations: ['permissions'] });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repo.findOne({ where: { name }});
  }

  async findAllByNames(names: string[]): Promise<Role[]> {
    return this.repo.find({ where: { name: In(names) }});
  }

  async create(role: Role): Promise<Role> {
    return this.repo.save(role);
  }

  async update(role: Role): Promise<Role> {
    return this.repo.save(role);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
