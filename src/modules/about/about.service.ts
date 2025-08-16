import { AboutRepository } from './about.repository';
import { CreateAboutDto } from './about.dto';
import { About, Story, StoryStat, Values, ValueItem } from './about.entity';

export class AboutService {
  private aboutRepository: AboutRepository;

  constructor(aboutRepository?: AboutRepository) {
    this.aboutRepository = aboutRepository || new AboutRepository();
  }

  async findAll(): Promise<About[]> {
    return this.aboutRepository.findAll();
  }

  async findOne(id: number): Promise<About> {
    const about = await this.aboutRepository.findOne(id);
    if (!about) throw new Error(`About with id ${id} not found`);
    return about;
  }

  async create(dto: CreateAboutDto): Promise<About> {
    const about = new About();
    about.mainTitle = dto.mainTitle;
    about.highlightedTitle = dto.highlightedTitle;
    about.description = dto.description;

    if (dto.story) {
      const story = new Story();
      story.title = dto.story.title;
      story.content = dto.story.content;
      story.stats = dto.story.stats.map(statDto => {
        const stat = new StoryStat();
        stat.text = statDto.text;
        return stat;
      });
      about.story = story;
    }

    if (dto.values) {
      const values = new Values();
      values.title = dto.values.title;
      values.subtitle = dto.values.subtitle;
      values.items = dto.values.items.map(itemDto => {
        const item = new ValueItem();
        item.icon = itemDto.icon;
        item.title = itemDto.title;
        item.description = itemDto.description;
        return item;
      });
      about.values = values;
    }

    return this.aboutRepository.create(about);
  }

  async update(id: number, dto: CreateAboutDto): Promise<About> {
    const about = await this.findOne(id);
    about.mainTitle = dto.mainTitle;
    about.highlightedTitle = dto.highlightedTitle;
    about.description = dto.description;

    if (dto.story) {
      if (about.story) {
        await this.aboutRepository.deleteStoryStatsByStoryId(about.story.id);
        about.story.title = dto.story.title;
        about.story.content = dto.story.content;
        about.story.stats = dto.story.stats.map(statDto => {
          const stat = new StoryStat();
          stat.text = statDto.text;
          return stat;
        });
      } else {
        const story = new Story();
        story.title = dto.story.title;
        story.content = dto.story.content;
        story.stats = dto.story.stats.map(statDto => {
          const stat = new StoryStat();
          stat.text = statDto.text;
          return stat;
        });
        about.story = story;
      }
    }

    if (dto.values) {
      if (about.values) {
        await this.aboutRepository.deleteValueItemsByValuesId(about.values.id);
        about.values.title = dto.values.title;
        about.values.subtitle = dto.values.subtitle;
        about.values.items = dto.values.items.map(itemDto => {
          const item = new ValueItem();
          item.icon = itemDto.icon;
          item.title = itemDto.title;
          item.description = itemDto.description;
          return item;
        });
      } else {
        const values = new Values();
        values.title = dto.values.title;
        values.subtitle = dto.values.subtitle;
        values.items = dto.values.items.map(itemDto => {
          const item = new ValueItem();
          item.icon = itemDto.icon;
          item.title = itemDto.title;
          item.description = itemDto.description;
          return item;
        });
        about.values = values;
      }
    }

    return this.aboutRepository.update(about);
  }

  async delete(id: number): Promise<void> {
    await this.aboutRepository.delete(id);
  }
}
