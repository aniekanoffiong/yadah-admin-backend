import { Request, Response, NextFunction } from 'express';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './gallery.dto';

export class GalleryController {
  private galleryService: GalleryService;

  constructor(galleryService?: GalleryService) {
    this.galleryService = galleryService || new GalleryService();
  }

  /**
   * Route handlers for gallery items
   */
  getAllItems = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.galleryService.findAllItems();
      res.json({ data: items });
    } catch (error) {
      next(error);
    }
  };

  getItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const item = await this.galleryService.findItemById(id);
      res.json({ data: item });
    } catch (error) {
      next(error);
    }
  };

  createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateGalleryItemDto;
      const item = await this.galleryService.createItem(dto);
      res.status(201).json({ data: item });
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateGalleryItemDto;
      const item = await this.galleryService.updateItem(id, dto);
      res.json({ data: item });
    } catch (error) {
      next(error);
    }
  };

  deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.galleryService.deleteItem(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
