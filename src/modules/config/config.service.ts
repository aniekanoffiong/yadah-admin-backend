import { ConfigField } from './config.entity';
import { ConfigFieldDTO } from './config.dto';
import { ConfigFieldRepository } from './config.repository';

export class ConfigFieldService {
  constructor(
    private configFieldRepository: ConfigFieldRepository = new ConfigFieldRepository()
  ) {}

  async create(dto: ConfigFieldDTO): Promise<ConfigField> {
    const config = new ConfigField();
    config.entityName = dto.entityName;
    config.fieldName = dto.fieldName;
    config.label = dto.label;
    config.fieldType = dto.fieldType;
    config.optionsJson = dto.optionsJson;
    config.editable = dto.editable;
    config.validationRulesJson = dto.validationRulesJson;
    config.displayOrder = dto.displayOrder;
    config.helpText = dto.helpText;

    return this.configFieldRepository.create(config);
  }

  async findAll(): Promise<ConfigField[]> {
    return this.configFieldRepository.findAll();
  }

  async findByEntity(entityName: string): Promise<ConfigField[]> {
    return this.configFieldRepository.findByEntity(entityName);
  }

  async findById(id: number): Promise<ConfigField | null> {
    return this.configFieldRepository.findOne(id);
  }

  async update(id: number, dto: Partial<ConfigFieldDTO>): Promise<ConfigField | null> {
    const configField = await this.findById(id);
    if (!configField) {
      return null;
    }
    Object.assign(configField, dto);
    return this.configFieldRepository.update(configField);
  }

  async delete(id: number): Promise<void> {
    return this.configFieldRepository.delete(id);
  }
}
