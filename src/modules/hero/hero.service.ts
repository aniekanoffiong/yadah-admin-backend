import { HeroRepository } from './hero.repository';
import { Hero } from './hero.entity';
import { CreateHeroDto, HeroResponseDto } from './hero.dto';
import { SpecificPage } from '../../utils/enums';
import { FileStorageService } from '../fileStorage/fileStorage.service';

export class HeroService {
  private heroRepository: HeroRepository;
  private fileStorageService: FileStorageService;

  constructor(heroRepository?: HeroRepository, fileStorageService?: FileStorageService) {
    this.heroRepository = heroRepository || new HeroRepository();
    this.fileStorageService = fileStorageService || new FileStorageService();
  }

  async findAll(): Promise<Hero[]> {
    return this.heroRepository.findAll();
  }

  async findOne(id: number): Promise<Hero> {
    const hero = await this.heroRepository.findOne(id);
    if (!hero) throw new Error(`Hero with id ${id} not found`);
    return hero;
  }

  async findByPage(page: SpecificPage): Promise<HeroResponseDto | null> {
    return await this.toDto(await this.heroRepository.findByPage(page)) || null;
  }

  async create(dto: CreateHeroDto): Promise<Hero> {
    const hero = new Hero();
    hero.page = dto.page;
    hero.image = dto.image;
    hero.video = dto.video;
    hero.title = dto.title;
    hero.subtitle = dto.subtitle;
    hero.showControls = dto.showControls;
    hero.volunteerProgramText = dto.volunteerProgramText;
    hero.volunteerProgramLink = dto.volunteerProgramLink;

    return this.heroRepository.create(hero);
  }

  async update(id: number, dto: CreateHeroDto): Promise<Hero> {
    const hero = await this.findOne(id);
    hero.page = dto.page;
    hero.image = dto.image;
    hero.video = dto.video;
    hero.title = dto.title;
    hero.subtitle = dto.subtitle;
    hero.showControls = dto.showControls;
    hero.volunteerProgramText = dto.volunteerProgramText;
    hero.volunteerProgramLink = dto.volunteerProgramLink;

    return this.heroRepository.update(hero);
  }

  async delete(id: number): Promise<void> {
    await this.heroRepository.delete(id);
  }

  private async toDto(heroData: Hero | null): Promise<HeroResponseDto | null> {
    if (!heroData) return null
    return {
      title: heroData.title,
      subtitle: heroData.subtitle,
      backgroundImage: await this.fileStorageService.getDownloadUrl(heroData.image),
      video: await this.fileStorageService.getDownloadUrl(heroData.video),
      volunteerProgram: { text: heroData.volunteerProgramText }
    }
  }
}
