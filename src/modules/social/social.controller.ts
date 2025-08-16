import { Request, Response, NextFunction } from 'express';
import { SocialLinkService } from './social.service';
import { CreateSocialDto } from './social.dto';

export class SocialLinkController {
  private socialLinkService: SocialLinkService;

  constructor(socialLinkService?: SocialLinkService) {
    this.socialLinkService = socialLinkService || new SocialLinkService();
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const socialLinks = await this.socialLinkService.findAll();
      res.json(socialLinks);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const socialLink = await this.socialLinkService.findOne(id);
      res.json(socialLink);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateSocialDto;
      const socialLink = await this.socialLinkService.create(dto);
      res.status(201).json(socialLink);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateSocialDto;
      const socialLink = await this.socialLinkService.update(id, dto);
      res.json(socialLink);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.socialLinkService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
