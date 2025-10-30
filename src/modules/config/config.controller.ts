import { Request, Response, NextFunction } from 'express';
import { ConfigFieldService } from './config.service';
import { ConfigEntityFieldDTO, ConfigEntityDTO, CreateConfigEntityDto, CreateConfigFieldDto, UpdateConfigEntityDto } from './config.dto';
import { ConfigEntity, ConfigEntityField } from './config.entity';

export class ConfigFieldController {
  private configFieldService: ConfigFieldService;

  constructor(configFieldService?: ConfigFieldService) {
    this.configFieldService = configFieldService || new ConfigFieldService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fields = await this.configFieldService.findAll();
      res.json({ data: fields.map(this.toDto) });
    } catch (error) {
      next(error);
    }
  };

  getByEntity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entityName = req.params.entityName;
      const fields = await this.configFieldService.findByEntity(entityName);
      res.json({ data: fields.map(this.toDto) });
    } catch (error) {
      next(error);
    }
  };

  getEntityConfiguration = async (req: Request, res: Response): Promise<void> => {
    const requestEntity = req.params.entityName
    const configList = this.configFieldService.entityConfigurationList()
    res.json({ data: configList.find(config => config.entityType === requestEntity) })
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const field = await this.configFieldService.findById(id);
      res.json({ data: this.toDto(field) });
    } catch (error) {
      next(error);
    }
  };

  createEntity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateConfigEntityDto;
      const field = await this.configFieldService.create(dto);
      res.status(201).json({ data: this.toDto(field) });
    } catch (error) {
      next(error);
    }
  };

  createField = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateConfigFieldDto;
      const field = await this.configFieldService.createField(id, dto);
      res.status(201).json({ data: this.processEntityField(field) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as UpdateConfigEntityDto;
      const field = await this.configFieldService.update(id, dto);
      res.json({ data: this.toDto(field) });
    } catch (error) {
      next(error);
    }
  };

  updateField = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const fieldId = Number(req.params.fieldId);
      const dto = req.body as CreateConfigFieldDto;
      const field = await this.configFieldService.updateField(id, fieldId, dto);
      if (field) {
        res.json({ data: this.processEntityField(field) });
        return
      }
      res.status(404).json({ message: 'Config field not found' })
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.configFieldService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  removeField = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const fieldId = Number(req.params.fieldId);
      await this.configFieldService.deleteField(id, fieldId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  toDto = (configData: ConfigEntity | null) => {
    return this.processEntityDto(configData)
  }

  private processEntityDto(configData: ConfigEntity | null) {
    if (!configData) {
      return null
    }
    const configDto = new ConfigEntityDTO()
    configDto.id = configData.id
    configDto.entityName = configData.entityName
    configDto.multipleOccurrence = configData.multipleOccurrence ?? false
    configDto.maxOccurrence = configData.maxOccurrence
    configDto.authorizations = configData.authorizations
    configDto.fields = configData.fields?.map(this.processEntityField) ?? []
    if (configData.subEntities) {
      configDto.subEntities = configData.subEntities.map(this.processEntityDto.bind(this)).filter(e => e !== null);
    }
    return configDto;
  }
  
  private processEntityField(fieldData: ConfigEntityField): ConfigEntityFieldDTO {
    const fieldDto = new ConfigEntityFieldDTO();
    fieldDto.id = fieldData.id;
    fieldDto.fieldName = fieldData.fieldName;
    fieldDto.label = fieldData.label;
    fieldDto.fieldType = fieldData.fieldType;
    fieldDto.optionsJson = fieldData.optionsJson;
    fieldDto.editable = fieldData.editable;
    fieldDto.styling = fieldData.styling;
    fieldDto.validationRulesJson = fieldData.validationRulesJson;
    fieldDto.displayOrder = fieldData.displayOrder;
    fieldDto.helpText = fieldData.helpText;
    fieldDto.multipleOccurrence = fieldData.multipleOccurrence;
    return fieldDto;
  }
}
