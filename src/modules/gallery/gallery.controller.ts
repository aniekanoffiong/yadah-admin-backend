import { Request, Response, NextFunction } from 'express';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto, GalleryItemDto } from './gallery.dto';
import { GalleryItem } from './gallery.entity';
import { format } from 'date-fns';
import { FileStorageService } from '../fileStorage/fileStorage.service';

export class GalleryController {
  private galleryService: GalleryService;
  private fileStorageService: FileStorageService;

  constructor(galleryService?: GalleryService, fileStorageService?: FileStorageService) {
    this.galleryService = galleryService || new GalleryService();
    this.fileStorageService = fileStorageService || new FileStorageService();
  }

  /**
   * Route handlers for gallery items
   */
  getAllItems = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.galleryService.findAllItems();
      res.json({ data: await Promise.all(items.map(this.toDto.bind(this))) });
    } catch (error) {
      next(error);
    }
  };

  getItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const item = await this.galleryService.findItemById(id);
      res.json({ data: await this.toDto(item) });
    } catch (error) {
      next(error);
    }
  };

  createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGalleryItemDto;
      const item = await this.galleryService.createItem(dto);
      res.status(201).json({ data: await this.toDto(item) });
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGalleryItemDto;
      const item = await this.galleryService.updateItem(id, dto);
      res.json({ data: await this.toDto(item) });
    } catch (error) {
      next(error);
    }
  };

  deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.galleryService.deleteItem(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private async toDto(item: GalleryItem): Promise<GalleryItemDto> {
    return {
      ...item,
      src: await this.fileStorageService.getDownloadUrl(item.src),
      // date: format(item.date, "iii. do MMM., yyyy"),
      tags: item.tags.map(tag => ({
        value: tag.id,
        label: tag.label,
        active: tag.isActive,
      })),
    }
  }
}
