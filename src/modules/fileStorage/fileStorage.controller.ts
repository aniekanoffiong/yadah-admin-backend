import { Request, Response, NextFunction } from 'express';
import { FileStorageService } from './fileStorage.service';

export class FileStorageController {
  private service = new FileStorageService();

  generatePresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName, contentType } = req.body;
      const url = await this.service.generatePresignedUrl(fileName, contentType);
      res.json({ data: { url } });
    } catch (err) {
      next(err);
    }
  };

  getDownloadUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileKey } = req.query;
      const url = await this.service.getDownloadUrl(fileKey as string);
      res.json({ data: { url } });
    } catch (err) {
      next(err);
    }
  };
}
