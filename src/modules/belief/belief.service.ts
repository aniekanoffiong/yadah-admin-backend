import { BeliefRepository } from './belief.repository';
import { CreateBeliefDto, CreateBeliefItemDto, UpdateBeliefItemDto } from './belief.dto';
import { Belief, BeliefItem } from './belief.entity';

export class BeliefService {
  private beliefRepository: BeliefRepository;

  constructor(beliefRepository?: BeliefRepository) {
    this.beliefRepository = beliefRepository || new BeliefRepository();
  }

  async find(): Promise<Belief> {
    const belief = await this.beliefRepository.find();
    if (!belief) throw new Error(`Belief not found`);
    return belief;
  }

  async update(dto: CreateBeliefDto): Promise<Belief> {
    const belief = await this.find();
    belief.title = dto.title;
    belief.subtitle = dto.subtitle;
    belief.items = await Promise.all(dto.items.map(async(itemDto) => {
      if (itemDto.id) {
        const item = await this.findBeliefItem(itemDto.id)
        item.title = itemDto.title;
        item.content = itemDto.content;
        return item;
      } else {
        const item = new BeliefItem();
        item.beliefId = belief.id!;
        item.title = itemDto.title;
        item.content = itemDto.content;
        return item;
      }
    }));

    return this.beliefRepository.update(belief);
  }

  // Belief Items
  async findAllBeliefItems(): Promise<BeliefItem[]> {
    return this.beliefRepository.findAllBeliefItems();
  }

  async findBeliefItem(id: number): Promise<BeliefItem> {
    const BeliefItem = await this.beliefRepository.findBeliefItem(id);
    if (!BeliefItem) throw new Error("Stat Item not found")
    return BeliefItem
  }

  async createBeliefItem(dto: CreateBeliefItemDto): Promise<BeliefItem> {
    const item = new BeliefItem();
    item.title = dto.title;
    item.content = dto.content;
    return this.beliefRepository.createBeliefItem(item);
  }

  async updateBeliefItem(id: number, dto: UpdateBeliefItemDto): Promise<BeliefItem> {
    await this.find();
    const storyItem = await this.beliefRepository.findBeliefItem(id);
    if (!storyItem) throw Error(`StatItem with id ${id} not found`);
    storyItem.title = dto.title;
    storyItem.content = dto.content;

    return this.beliefRepository.updateBeliefItem(storyItem);
  }

  async deleteBeliefItem(id: number): Promise<void> {
    await this.beliefRepository.deleteBeliefItem(id);
  }
}
