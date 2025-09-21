import { Repository } from 'typeorm';
import { ConfigEntity, ConfigEntityField } from './config.entity';
import { AppDataSource } from '../../database/data-source';

export class ConfigFieldRepository {
  private repo: Repository<ConfigEntity>;
  private fieldRepo: Repository<ConfigEntityField>;

  constructor() {
    this.repo = AppDataSource.getRepository(ConfigEntity);
    this.fieldRepo = AppDataSource.getRepository(ConfigEntityField);
  }

  async findAll(): Promise<ConfigEntity[]> {
    return this.repo.createQueryBuilder('config')
      .where('config.parentEntity IS NULL')
      .leftJoinAndSelect('config.fields', 'fields')
      .getMany();
  }

  async findOne(id: number): Promise<ConfigEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findSubEntities(id: number): Promise<ConfigEntity[]> {
    return this.repo.find({ where: { parentEntity: { id } }});
  }

  async allSubEntities(): Promise<ConfigEntity[]> {
    return this.repo.createQueryBuilder('config')
      .addSelect('config.parentEntityId')
      .where('config.parentEntity IS NOT NULL')
      .leftJoinAndSelect('config.fields', 'fields')
      .getMany();
  }

  async findByEntity(entityName: string): Promise<ConfigEntity[]> {
    return this.repo.find({
      where: { 
        entityName,
      },
    });
  }

  async create(config: ConfigEntity): Promise<ConfigEntity> {
    return this.repo.save(config);
  }

  async createField(config: ConfigEntityField): Promise<ConfigEntityField> {
    return this.fieldRepo.save(config);
  }

  async update(config: ConfigEntity): Promise<ConfigEntity> {
    return this.repo.save(config);
  }

  async updateField(field: ConfigEntityField): Promise<ConfigEntityField> {
    return this.fieldRepo.save(field);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async deleteField(fieldId: number): Promise<void> {
    await this.fieldRepo.delete(fieldId);
  }
}
