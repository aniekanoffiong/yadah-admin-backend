import { Repository } from 'typeorm';
import { SocialLink } from './social.entity';
import { AppDataSource } from '../../database/data-source';
import { Platform } from '../../utils/enums';

export class SocialLinkRepository {
  private repo: Repository<SocialLink>;

  constructor() {
    this.repo = AppDataSource.getRepository(SocialLink);
  }

  async findAll(): Promise<SocialLink[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<SocialLink | null> {
    return this.repo.findOne({ where: { id }  });
  }

  async findByPlatform(platform: Platform): Promise<SocialLink | null> {
    return this.repo.findOne({ where: { platform }  });
  }

  async create(socialLink: SocialLink): Promise<SocialLink> {
    return this.repo.save(socialLink);
  }

  async update(socialLink: SocialLink): Promise<SocialLink> {
    return this.repo.save(socialLink);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
