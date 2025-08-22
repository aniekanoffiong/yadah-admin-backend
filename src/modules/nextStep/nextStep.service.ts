import { NextStepRepository } from './nextStep.repository';
import { NextStep, NextStepItem, NextStepVariants } from './nextStep.entity';
import { CreateNextStepDto, NextStepItemDto, UpdateNextStepItemDto } from './nextStep.dto';

export class NextStepService {
  private nextStepRepository: NextStepRepository;

  constructor(nextStepRepository?: NextStepRepository) {
    this.nextStepRepository = nextStepRepository || new NextStepRepository();
  }

  async findOne(variant: NextStepVariants = NextStepVariants.StandardNextStep): Promise<NextStep> {
    const nextStep = await this.nextStepRepository.find(variant);
    if (!nextStep) throw new Error(`NextStep not found`);
    return nextStep;
  }

  async create(dto: CreateNextStepDto): Promise<NextStep> {
    const nextStep = new NextStep();
    nextStep.title = dto.title;
    nextStep.subtitle = dto.subtitle;
    nextStep.variant = dto.variant;

    nextStep.items = dto.items.map(actDto => {
      const item = new NextStepItem();
      item.icon = actDto.icon;
      item.title = actDto.title;
      item.description = actDto.description;
      item.buttonText = actDto.buttonText;
      item.buttonLink = actDto.buttonLink;
      return item;
    });
    
    return this.nextStepRepository.create(nextStep);
  }

  async update(dto: CreateNextStepDto): Promise<NextStep> {
    const nextStep = await this.findOne();
    nextStep.title = dto.title;
    nextStep.subtitle = dto.subtitle;
    nextStep.variant = dto.variant;

    nextStep.items = dto.items.map(actDto => {
      const item = new NextStepItem();
      item.icon = actDto.icon;
      item.title = actDto.title;
      item.description = actDto.description;
      item.buttonText = actDto.buttonText;
      item.buttonLink = actDto.buttonLink;
      return item;
    });
  
    return this.nextStepRepository.update(nextStep);
  }

  async findNextStepItem(itemId: number): Promise<NextStepItem> {
    const nextStepItem = await this.nextStepRepository.findNextStepItem(itemId);
    if (!nextStepItem) throw new Error(`NextStepItem not found`);
    return nextStepItem;
  }

  async updateNextStepItem(itemId: number, updateDto: UpdateNextStepItemDto): Promise<NextStepItem> {
    const item = await this.findNextStepItem(itemId)
    item.icon = updateDto.icon;
    item.title = updateDto.title;
    item.description = updateDto.description;
    item.buttonText = updateDto.buttonText;
    item.buttonLink = updateDto.buttonLink;

    return this.nextStepRepository.updateNextStepItem(item)
  }

  async deleteNextStepItem(id: number): Promise<void> {
    await this.nextStepRepository.deleteNextStepItem(id);
  }
}
