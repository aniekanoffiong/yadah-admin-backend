import { HeroRepository } from './hero.repository';
import { Hero } from './hero.entity';
import { CreateHeroDto, HeroDto, HeroResponseDto } from './hero.dto';
import { SpecificPage } from '../../utils/enums';

export class HeroService {
  private heroRepository: HeroRepository;

  constructor(heroRepository?: HeroRepository) {
    this.heroRepository = heroRepository || new HeroRepository();
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
    return this.toDto(await this.heroRepository.findByPage(page)) || null;
  }

  async create(dto: CreateHeroDto): Promise<Hero> {
    const hero = new Hero();
    hero.page = dto.page;
    hero.backgroundImage = dto.backgroundImage;
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
    hero.backgroundImage = dto.backgroundImage;
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

  private toDto(heroData: Hero | null): HeroResponseDto | null {
    if (!heroData) return null
    return {
      title: heroData.title,
      subtitle: heroData.subtitle,
      backgroundImage: heroData.backgroundImage,
      volunteerProgram: { text: heroData.volunteerProgramText }
    }
  }
}
