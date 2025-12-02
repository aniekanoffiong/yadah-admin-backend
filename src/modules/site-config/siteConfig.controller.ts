import { Request, Response, NextFunction } from 'express';
import { SiteConfigService } from './siteConfig.service';

export class SiteConfigController {
  private siteConfigService: SiteConfigService;

  constructor(siteConfigService?: SiteConfigService) {
    this.siteConfigService = siteConfigService || new SiteConfigService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allConfigData = await this.siteConfigService.allConfigs();
      res.json({ data: Object.entries(allConfigData).map(this.toDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  getByConfigKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = req.params.key;
      const configData = await this.siteConfigService.getConfig(key);
      res.json({ data: this.toDto([key, configData]) });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body;
      const key = req.params.key;
      const configData = await this.siteConfigService.setConfig(key, dto);
      res.status(201).json({ data: this.toDto([key, configData]) });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body.content;
      const key = req.body.name;
      const configData = await this.siteConfigService.setConfig(key, dto);
      res.status(200).json({ data: this.toDto([key, configData]) });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = req.params.key;
      await this.siteConfigService.removeConfig(key);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private toDto(configEntry: [string, Record<string, any>], index: number = 0) {
    return {
      id: index + 1,
      name: configEntry[0],
      content: configEntry[1],
    }
  }
}
