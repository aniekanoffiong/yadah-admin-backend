import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from './statistics.service';
import { CreateStatisticsDto, CreateStatItemDto, StatisticsDto, StatItemDto, UpdateStatItemDto } from './statistics.dto';
import { Statistics, StatItem } from './statistics.entity';
import { FileStorageService } from '../fileStorage/fileStorage.service';

export class StatisticsController {
  private statisticsService: StatisticsService;
  private fileStorageService: FileStorageService;

  constructor(statisticsService?: StatisticsService, fileStorageService?: FileStorageService) {
    this.statisticsService = statisticsService || new StatisticsService();
    this.fileStorageService = fileStorageService || new FileStorageService();
  }

  get = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.statisticsService.find();
      res.json({ data: [await this.toStatisticsDto(stats)] });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateStatisticsDto;
      const stats = await this.statisticsService.update(dto);
      res.json({ data: await this.toStatisticsDto(stats) });
    } catch (error) {
      next(error);
    }
  };

  allStatItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stateItem = await this.statisticsService.findAllStatItems();
      res.json({ data: stateItem.map(this.toStatItemDto.bind(this)) });
    } catch (error) {
      next(error);
    }
  };

  createStatItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateStatItemDto;
      const statItem = await this.statisticsService.createStatItem(dto);
      res.json({ data: this.toStatItemDto(statItem) });
    } catch (error) {
      next(error);
    }
  };

  updateStatItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as UpdateStatItemDto;
      const statItem = await this.statisticsService.updateStatItem(id, dto);
      res.json({ data: this.toStatItemDto(statItem) });
    } catch (error) {
      next(error);
    }
  };

  deleteStatItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.statisticsService.deleteStatItem(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private async toStatisticsDto(statistics: Statistics): Promise<StatisticsDto> {
    return {
      id: statistics.id,
      backgroundImage: statistics.backgroundImage ? await this.fileStorageService.getDownloadUrl(statistics.backgroundImage) : "",
      statItems: statistics.statItems.map(this.toStatItemDto.bind(this)),
    };
  }

  private toStatItemDto(statItem: StatItem): StatItemDto {
    return {
      id: statItem.id,
      statisticsId: statItem.statisticsId,
      number: statItem.number,
      label: statItem.label,
      icon: statItem.icon,
    };
  }
}
