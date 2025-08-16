import { SermonRepository } from './sermon.repository';
import { Sermon } from './sermon.entity'; // You can separate imports if needed
import { CreateSermonDto } from './sermon.dto';
import { ItemTagService } from '../itemTag/itemTag.service';

export class SermonService {
  private sermonRepository: SermonRepository;
  private itemTagService: ItemTagService;

  constructor(sermonRepository?: SermonRepository, itemTagService?: ItemTagService) {
    this.sermonRepository = sermonRepository || new SermonRepository();
    this.itemTagService = itemTagService || new ItemTagService()
  }

  async findAllSermons(): Promise<Sermon[]> {
    return this.sermonRepository.findAllSermons();
  }

  async findOneSermon(id: number): Promise<Sermon> {
    const sermon = await this.sermonRepository.findOneSermon(id);
    if (!sermon) throw new Error(`Sermon with id ${id} not found`);
    return sermon;
  }

  async createSermon(dto: CreateSermonDto): Promise<Sermon> {
    const tags = await this.itemTagService.getOrCreateTags(dto.tags)
    const sermon = new Sermon();
    sermon.title = dto.title;
    sermon.minister = dto.minister;
    sermon.date = new Date(dto.date);
    sermon.image = dto.image;
    sermon.duration = dto.duration;
    sermon.videoUrl = dto.videoUrl;
    sermon.tags = tags

    return this.sermonRepository.createSermon(sermon);
  }

  async updateSermon(id: number, dto: CreateSermonDto): Promise<Sermon> {
    const sermon = await this.findOneSermon(id);
    sermon.title = dto.title;
    sermon.minister = dto.minister;
    sermon.date = new Date(dto.date);
    sermon.image = dto.image;
    sermon.duration = dto.duration;
    sermon.videoUrl = dto.videoUrl;

    return this.sermonRepository.updateSermon(sermon);
  }

  async deleteSermon(id: number): Promise<void> {
    await this.sermonRepository.deleteSermon(id);
  }
}
