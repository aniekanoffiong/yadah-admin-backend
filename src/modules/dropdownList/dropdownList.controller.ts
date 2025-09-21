import { Request, Response, NextFunction } from 'express';
import { SocialLinkService } from '../social/social.service';
import { SiteLinkService } from '../siteLinks/siteLink.service';
import { ItemTagService } from '../itemTag/itemTag.service';
import { PaymentOptionService } from '../payment/paymentOption.service';

export class DropdownListController {
  private socialLinkService: SocialLinkService;
  private siteLinkService: SiteLinkService;
  private itemTagService: ItemTagService;
  private paymentOptionService: PaymentOptionService;

  constructor() {
    this.socialLinkService = new SocialLinkService();
    this.siteLinkService = new SiteLinkService();
    this.itemTagService = new ItemTagService();
    this.paymentOptionService = new PaymentOptionService();
  }

  getIcons = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({ 
        data: [
          { label: "User", value: "user" },
          { label: "Users", value: "users" },
          { label: "Globe", value: "globe" },
          { label: "Heart", value: "heart" },
          { label: "Email", value: "email" },
          { label: "Church", value: "church" },
          { label: "Building", value: "building" },
          { label: "Calendar", value: "calendar" },
          { label: "Contact", value: "contact" },
          { label: "Password", value: "password" },
          { label: "Phone", value: "phone" },
          { label: "File", value: "file" },
          { label: "Folder", value: "folder" },
          { label: "Baby", value: "baby" },
          { label: "Children", value: "children" },
          { label: "Family", value: "family" },
          { label: "Zap", value: "zap" },
          { label: "Help", value: "help" }
        ]
      });
    } catch (error) {
      next(error);
    }
  };

  socialLinks = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const links = await this.socialLinkService.findAll();
      res.json({ data: links.map(link => ({ label: link.platform, value: link.id }))});
    } catch (error) {
      next(error);
    }
  };

  siteLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const links = await this.siteLinkService.findAll();
      res.json({ data: links.map(link => ({ label: link.label, value: link.id }))});
    } catch (error) {
      next(error);
    }
  };

  getTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.itemTagService.findAllTags();
      res.json({ data: tags.map(tag => ({ label: tag.label, value: tag.id }))});
    } catch (error) {
      next(error);
    }
  };

  getSocialIcons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json({ 
        data: [
          { label: "Facebook", value: "facebook" },
          { label: "Instagram", value: "instagram" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "Twitter (X)", value: "twitter" },
          { label: "YouTube", value: "youtube" },
          { label: "TikTok", value: "tiktok" },
          { label: "Pinterest", value: "pinterest" },
          { label: "Snapchat", value: "snapchat" },
          { label: "Reddit", value: "reddit" },
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Discord", value: "discord" },
          { label: "Telegram", value: "telegram" }
        ]
      });
    } catch (error) {
      next(error);
    }
  };

  getEnabledPaymentOptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const options = await this.paymentOptionService.findEnabledOptions();
      res.json({ data: options.map(option => ({ label: option.title, value: option.id }))});
    } catch (error) {
      next(error);
    }
  };
}
