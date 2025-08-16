import { PastorRepository } from './pastor.repository';
import { CreatePastorDto } from './pastor.dto';
import { Pastor, Achievement, MinistryFocus } from './pastor.entity';

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

  async create(dto: CreatePastorDto): Promise<Pastor> {
    const pastor = new Pastor();
    pastor.image = dto.image;
    pastor.role = dto.role;
    pastor.name = dto.name;
    pastor.description = dto.description;
    pastor.quote = dto.quote;

    pastor.achievements = dto.achievements.map(achDto => {
      const ach = new Achievement();
      ach.icon = achDto.icon;
      ach.text = achDto.text;
      return ach;
    });

    if (dto.ministry) {
      const ministry = new MinistryFocus();
      ministry.title = dto.ministry.title;
      ministry.content = dto.ministry.content;
      pastor.ministry = ministry;
    }

    return this.pastorRepository.create(pastor);
  }

  async update(id: number, dto: CreatePastorDto): Promise<Pastor> {
    const pastor = await this.findOne(id);
    pastor.image = dto.image;
    pastor.role = dto.role;
    pastor.name = dto.name;
    pastor.description = dto.description;
    pastor.quote = dto.quote;

    await this.pastorRepository.deleteAchievementsByPastorId(id);

    pastor.achievements = dto.achievements.map(achDto => {
      const ach = new Achievement();
      ach.icon = achDto.icon;
      ach.text = achDto.text;
      return ach;
    });

    if (dto.ministry) {
      if (pastor.ministry) {
        pastor.ministry.title = dto.ministry.title;
        pastor.ministry.content = dto.ministry.content;
      } else {
        const ministry = new MinistryFocus();
        ministry.title = dto.ministry.title;
        ministry.content = dto.ministry.content;
        pastor.ministry = ministry;
      }
    } else {
      pastor.ministry = undefined;
    }

    return this.pastorRepository.update(pastor);
  }

  async delete(id: number): Promise<void> {
    await this.pastorRepository.delete(id);
  }
}
