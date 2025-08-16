import { BeliefRepository } from './belief.repository';
import { CreateBeliefDto } from './belief.dto';
import { Belief } from './belief.entity';

export class BeliefService {
  private beliefRepository: BeliefRepository;

  constructor(beliefRepository?: BeliefRepository) {
    this.beliefRepository = beliefRepository || new BeliefRepository();
  }

  async findAll(): Promise<Belief[]> {
    return this.beliefRepository.findAll();
  }

  async findOne(id: number): Promise<Belief> {
    const belief = await this.beliefRepository.findOne(id);
    if (!belief) throw new Error(`Belief with id ${id} not found`);
    return belief;
  }

  async create(dto: CreateBeliefDto): Promise<Belief> {
    const belief = new Belief();
    belief.title = dto.title;
    belief.content = dto.content;

    return this.beliefRepository.create(belief);
  }

  async update(id: number, dto: CreateBeliefDto): Promise<Belief> {
    const belief = await this.findOne(id);
    belief.title = dto.title;
    belief.content = dto.content;

    return this.beliefRepository.update(belief);
  }

  async delete(id: number): Promise<void> {
    await this.beliefRepository.delete(id);
  }
}
