import { PastorRepository } from './pastor.repository';
import { CreatePastorDto } from './pastor.dto';
import { Pastor, Achievement, MinistryFocus, MinistryJourneyItem } from './pastor.entity';

export class PastorService {
  private pastorRepository: PastorRepository;

  constructor(pastorRepository?: PastorRepository) {
    this.pastorRepository = pastorRepository || new PastorRepository();
  }

  async findAll(): Promise<Pastor[]> {
    return this.pastorRepository.findAll();
  }

  async findOne(id: number): Promise<Pastor> {
    const pastor = await this.pastorRepository.findOne(id);
    if (!pastor) throw new Error(`Pastor with id ${id} not found`);
    return pastor;
  }

  async findBySlug(slug: string): Promise<Pastor> {
    const pastor = await this.pastorRepository.findBySlug(slug);
    if (!pastor) throw new Error(`Pastor with slug ${slug} not found`);
    return pastor;
  }

  async leadPastor(): Promise<Pastor | null> {
    return await this.pastorRepository.getLeadPastor();
  }

  async create(dto: CreatePastorDto): Promise<Pastor> {
    const pastor = new Pastor();
    pastor.image = dto.image;
    pastor.role = dto.role;
    pastor.name = dto.name;
    pastor.about = dto.about;
    pastor.description = dto.description;
    pastor.quote = dto.quote;
    pastor.focusTitle = dto.focusTitle;
    pastor.focusContent = dto.focusContent;

    pastor.achievements = dto.achievements.map(achDto => {
      const ach = new Achievement();
      ach.icon = achDto.icon;
      ach.text = achDto.text;
      return ach;
    });

    pastor.focus = dto.ministry.map(ministryDto => {
      const ministry = new MinistryFocus();
      ministry.title = ministryDto.title;
      ministry.content = ministryDto.content;
      return ministry;
    });

    pastor.journey = dto.journeyItems.map(itemDto => {
      const item = new MinistryJourneyItem();
      item.year = itemDto.year;
      item.title = itemDto.title;
      item.subtitle = itemDto.subtitle;
      item.content = itemDto.content;
      return item;
    });

    return this.pastorRepository.create(pastor);
  }

  async update(id: number, dto: CreatePastorDto): Promise<Pastor> {
    const pastor = await this.findOne(id);
    pastor.image = dto.image;
    pastor.role = dto.role;
    pastor.name = dto.name;
    pastor.about = dto.about;
    pastor.description = dto.description;
    pastor.quote = dto.quote;
    pastor.focusTitle = dto.focusTitle;
    pastor.focusContent = dto.focusContent;

    await this.pastorRepository.deleteAchievementsByPastorId(id);

    pastor.achievements = dto.achievements.map(achDto => {
      const ach = new Achievement();
      ach.icon = achDto.icon;
      ach.text = achDto.text;
      return ach;
    });

    pastor.journey = dto.journeyItems.map(itemDto => {
      const item = new MinistryJourneyItem();
      item.year = itemDto.year;
      item.title = itemDto.title;
      item.subtitle = itemDto.subtitle;
      item.content = itemDto.content;
      return item;
    });

    pastor.focus = dto.ministry.map(ministryDto => {
      const ministry = new MinistryFocus();
      ministry.title = ministryDto.title;
      ministry.content = ministryDto.content;
      return ministry;
    });

    return this.pastorRepository.update(pastor);
  }

  async delete(id: number): Promise<void> {
    await this.pastorRepository.delete(id);
  }
}
