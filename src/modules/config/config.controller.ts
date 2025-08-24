import { Request, Response, NextFunction } from 'express';
import { ConfigFieldService } from './config.service';
import { ConfigFieldDTO, CreateConfigFieldDto } from './config.dto';

export class ConfigFieldController {
  private configFieldService: ConfigFieldService;

  constructor(configFieldService?: ConfigFieldService) {
    this.configFieldService = configFieldService || new ConfigFieldService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fields = await this.configFieldService.findAll();
      res.json({ data: fields });
    } catch (error) {
      next(error);
    }
  };

  getByEntity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entityName = req.params.entityName;
      const fields = await this.configFieldService.findByEntity(entityName);
      res.json({ data: fields });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const field = await this.configFieldService.findById(id);
      res.json({ data: field });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateConfigFieldDto;
      const field = await this.configFieldService.create(dto);
      res.status(201).json({ data: field });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as Partial<ConfigFieldDTO>;
      const field = await this.configFieldService.update(id, dto);
      res.json({ data: field });
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
}
