import { CreateConfigEntityDto, CreateConfigFieldDto, EntityMetadata, UpdateConfigEntityDto } from './config.dto';
import { ConfigEntity, ConfigEntityField } from './config.entity';
import { ConfigFieldRepository } from './config.repository';

export class ConfigFieldService {
  private configFieldRepository: ConfigFieldRepository;

  constructor(configFieldRepository?: ConfigFieldRepository) {
    this.configFieldRepository = configFieldRepository || new ConfigFieldRepository()
  }

  async create(dto: CreateConfigEntityDto): Promise<ConfigEntity> {
    const config = await this.createConfig(dto);
    // create config fields
    if (dto.fields && dto.fields.length > 0) {
      for (const data of dto.fields) {
        await this.createField(config.id, data);
      }
    }

    // create subEntities
    if (dto.subEntities && dto.subEntities.length > 0) {
      for (const subEntityData of dto.subEntities) {
        await this.create({ ...subEntityData, parentEntityId: config.id })
      }
    }
    return config;
  }

  private async createConfig(data: CreateConfigEntityDto): Promise<ConfigEntity> {
    const config = new ConfigEntity();
    config.entityName = data.entityName;
    config.multipleOccurrence = data.multipleOccurrence;
    config.maxOccurrence = data.maxOccurrence;
    config.authorizations = data.authorizations;
    config.parentEntityId = data.parentEntityId

    return this.configFieldRepository.save(config);
  }

  async createField(id: number, dto: CreateConfigFieldDto): Promise<ConfigEntityField> {
    const configEntity = await this.configFieldRepository.findOne(id);
    if (!configEntity) {
      throw new Error('Config entity not found');
    }

    const configField = new ConfigEntityField()
    configField.configEntity = configEntity;
    configField.fieldName = dto.fieldName;
    configField.label = dto.label;
    configField.fieldType = dto.fieldType;
    configField.optionsJson = dto.optionsJson;
    configField.editable = dto.editable;
    configField.validationRulesJson = dto.validationRulesJson;
    configField.displayOrder = dto.displayOrder;
    configField.helpText = dto.helpText;
    configField.multipleOccurrence = dto.multipleOccurrence;

    return this.configFieldRepository.saveField(configField);
  }

  async findAll(): Promise<ConfigEntity[]> {
    const configEntities = await this.configFieldRepository.findAll();
    const subEntities = await this.configFieldRepository.allSubEntities();
    return configEntities.map(entity => {
      const currentSubEntities = subEntities.filter(sub => sub.parentEntityId === entity.id);
      return { ...entity, subEntities: currentSubEntities.length ? currentSubEntities : [] };
    });
  }

  async findSubEntities(id: number): Promise<ConfigEntity[]> {
    return await this.configFieldRepository.findSubEntities(id);
  }

  async findByEntity(entityName: string): Promise<ConfigEntity[]> {
    return this.configFieldRepository.findByEntity(entityName);
  }

  async findById(id: number): Promise<ConfigEntity | null> {
    return this.configFieldRepository.findOne(id);
  }

  async update(id: number, dto: UpdateConfigEntityDto): Promise<ConfigEntity | null> {
    const configField = await this.findById(id);
    if (!configField) {
      return null;
    }
    Object.assign(configField, dto);
    return this.configFieldRepository.update(configField);
  }

  async updateField(id: number, fieldId: number, dto: CreateConfigFieldDto): Promise<ConfigEntityField | null> {
    const configField = await this.findById(id);
    if (!configField) {
      return null;
    }
    const fieldToUpdate = configField.fields.find(field => field.id === fieldId);
    if (!fieldToUpdate) {
      return null;
    }
    Object.assign(fieldToUpdate, dto);
    return this.configFieldRepository.updateField(fieldToUpdate);
  }

  async delete(id: number): Promise<void> {
    return this.configFieldRepository.delete(id);
  }

  async deleteField(id: number, fieldId: number): Promise<void> {
    const configField = await this.findById(id);
    if (!configField) {
      return;
    }
    const fieldToDelete = configField.fields.find(field => field.id === fieldId);
    if (!fieldToDelete) {
      return;
    }
    return this.configFieldRepository.deleteField(fieldId);
  }

  entityConfigurationList(): EntityMetadata[] {
    const entityConfigurations: EntityMetadata[] = [
      { entityType: "hero", multipleOccurrence: true },
      { entityType: "about", multipleOccurrence: false },
      { entityType: "belief", multipleOccurrence: true },
      { entityType: "event", multipleOccurrence: true },
      { entityType: "ministries", multipleOccurrence: true },
      { entityType: "pastor", multipleOccurrence: true },
      { entityType: "sermon", multipleOccurrence: true },
      { entityType: "gallery", multipleOccurrence: true },
      { entityType: "contact", multipleOccurrence: false, canLinkTo: ["social"], linkFields: ["socialLinks"] },
      { entityType: "social", multipleOccurrence: true },
      { entityType: "footer", multipleOccurrence: false, canLinkTo: ["social"], linkFields: ["socialLinks"] },
      { entityType: "statistics", multipleOccurrence: false },
      { entityType: "cta", multipleOccurrence: true },
      { entityType: "growInFaith", multipleOccurrence: true },
      { entityType: "auth", multipleOccurrence: false },
      { entityType: "config", multipleOccurrence: true },
      { entityType: "itemTag", multipleOccurrence: true },
      { entityType: "siteLinks", multipleOccurrence: true },
      { entityType: "twoFactor", multipleOccurrence: false },
      { entityType: "live", multipleOccurrence: true },
      { entityType: "paymentOption", multipleOccurrence: true }
    ];
    return entityConfigurations;
  }
}
