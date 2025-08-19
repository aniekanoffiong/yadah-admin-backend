import { Repository } from 'typeorm';
import { ConfigField } from './config.entity';
import { AppDataSource } from '../../database/data-source';

export class ConfigFieldRepository {
  private repo: Repository<ConfigField>;

  constructor() {
    this.repo = AppDataSource.getRepository(ConfigField);
  }

  async findAll(): Promise<ConfigField[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ConfigField | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByEntity(entityName: string): Promise<ConfigField[]> {
    return this.repo.find({
      where: { entityName },
      order: {
        displayOrder: 'ASC',
      },
    });
  }

  async create(config: ConfigField): Promise<ConfigField> {
    return this.repo.save(config);
  }

  async update(config: ConfigField): Promise<ConfigField> {
    return this.repo.save(config);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
