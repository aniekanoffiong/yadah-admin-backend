import { GrowInFaithRepository } from './growInFaith.repository';
import { CreateGrowInFaithDto } from './growInFaith.dto';
import { GrowInFaith } from './growInFaith.entity';

export class GrowInFaithService {
  private growingInFaithRepository: GrowInFaithRepository;

  constructor(growingInFaithRepository?: GrowInFaithRepository) {
    this.growingInFaithRepository = growingInFaithRepository || new GrowInFaithRepository();
  }

  async findOne(): Promise<GrowInFaith> {
    const entity = await this.growingInFaithRepository.findOne();
    if (!entity) throw new Error(`GrowingInFaith not found`);
    return entity;
  }

  async create(dto: CreateGrowInFaithDto): Promise<GrowInFaith> {
    const entity = new GrowInFaith();
    entity.title = dto.title;
    entity.description = dto.description;
    entity.secondDescription = dto.secondDescription;
    entity.image = dto.image;
    entity.buttonText = dto.buttonText;
    entity.buttonLink = dto.buttonLink;

    return this.growingInFaithRepository.create(entity);
  }

  async update(id: number, dto: CreateGrowInFaithDto): Promise<GrowInFaith> {
    const entity = await this.findOne(id);
    entity.title = dto.title;
    entity.description = dto.description;
    entity.secondDescription = dto.secondDescription;
    entity.image = dto.image;
    entity.buttonText = dto.buttonText;
    entity.buttonLink = dto.buttonLink;

    return this.growingInFaithRepository.update(entity);
  }

  async delete(id: number): Promise<void> {
    await this.growingInFaithRepository.delete(id);
  }
}
