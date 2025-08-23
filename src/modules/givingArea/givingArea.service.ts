

import { GivingAreaRepository } from './givingArea.repository';
import { GivingArea } from './givingArea.entity';
import { CreateGivingAreaDto } from './givingArea.dto';

export class GivingAreaService {
  private givingAreaRepository: GivingAreaRepository;

  constructor(givingAreaRepository?: GivingAreaRepository) {
    this.givingAreaRepository = givingAreaRepository || new GivingAreaRepository();
  }

  async findAllGivingAreas(): Promise<GivingArea[]> {
    return this.givingAreaRepository.findAllGivingAreas();
  }

  async findGivingAreaById(id: number): Promise<GivingArea> {
    const tag = await this.givingAreaRepository.findTagById(id);
    if (!tag) throw new Error(`GivingArea with id ${id} not found`);
    return tag;
  }

  async createGivingArea(dto: CreateGivingAreaDto): Promise<GivingArea> {
    const tag = new GivingArea();
    tag.icon = dto.icon;
    tag.title = dto.title;
    tag.description = dto.description;

    return this.givingAreaRepository.createGivingArea(tag);
  }

  async updateGivingArea(id: number, dto: CreateGivingAreaDto): Promise<GivingArea> {
    const tag = await this.findGivingAreaById(id);
    tag.icon = dto.icon;
    tag.title = dto.title;
    tag.description = dto.description;

    return this.givingAreaRepository.updateGivingArea(tag);
  }

  async deleteGivingArea(id: number): Promise<void> {
    await this.givingAreaRepository.deleteGivingArea(id);
  }
}
