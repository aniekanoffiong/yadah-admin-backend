import { AboutRepository } from './about.repository';
import { CreateAboutDto, StoryStatCreateDto, ValueItemCreateDto } from './about.dto';
import { About, Story, StoryStat, Values, ValueItem } from './about.entity';

export class AboutService {
  private aboutRepository: AboutRepository;
  
  constructor(aboutRepository?: AboutRepository) {
    this.aboutRepository = aboutRepository || new AboutRepository();
  }

  async find(): Promise<About> {
    const about = await this.aboutRepository.find();
    if (!about) throw new Error(`About data not found`);
    return about;
  }

  async create(dto: CreateAboutDto): Promise<About> {
    const about = new About();
    about.mainTitle = dto.mainTitle;
    about.highlightedTitle = dto.highlightedTitle;
    about.description = dto.description;

    if (dto.storyTitle && dto.storyContent) {
      const story = new Story();
      story.title = dto.storyTitle;
      story.content = dto.storyContent;
      about.story = story;
    }

    if (dto.valuesTitle && dto.valuesSubtitle) {
      const values = new Values();
      values.title = dto.valuesTitle;
      values.subtitle = dto.valuesSubtitle;
      about.values = values;
    }

    return this.aboutRepository.create(about);
  }

  async update(dto: CreateAboutDto): Promise<About> {
    const about = await this.find();
    about.mainTitle = dto.mainTitle;
    about.highlightedTitle = dto.highlightedTitle;
    about.description = dto.description;

    if (dto.storyTitle && dto.storyContent) {
      if (about.story) {
        about.story.title = dto.storyTitle;
        about.story.content = dto.storyContent;
      } else {
        const story = new Story();
        story.title = dto.storyTitle;
        story.content = dto.storyContent;
        about.story = story;
      }
    }

    if (dto.valuesTitle && dto.valuesSubtitle) {
      if (about.values) {
        about.values.title = dto.valuesTitle;
        about.values.subtitle = dto.valuesSubtitle;
      } else {
        const values = new Values();
        values.title = dto.valuesTitle;
        values.subtitle = dto.valuesSubtitle;
        about.values = values;
      }
    }

    return this.aboutRepository.update(about);
  }
  
  // About StoryStat
  async findAllStoryStats(): Promise<StoryStat[]> {
    return this.aboutRepository.findAllStoryStats();
  }

  async createStoryStat(dto: StoryStatCreateDto): Promise<StoryStat> {
    const about = await this.find()
    const storyStat = new StoryStat();
    storyStat.text = dto.text;
    storyStat.story = about.story

    return this.aboutRepository.createStoryStat(storyStat);
  }
  
  async updateStoryStat(id: number, dto: StoryStatCreateDto): Promise<StoryStat> {
    const about = await this.find();
    const storyStat = await this.aboutRepository.findStoryStat(id)
    if (!storyStat) throw Error(`StoryStat with id ${id} not found`)
    storyStat.text = dto.text;

    return this.aboutRepository.updateStoryStat(storyStat);
  }

  async deleteStoryStat(id: number): Promise<void> {
    return this.aboutRepository.deleteStoryStat(id)
  }

  // About ValueItem
  async findAllValueItems(): Promise<ValueItem[]> {
    return this.aboutRepository.findAllValueItems();
  }

  async createValueItem(dto: ValueItemCreateDto): Promise<ValueItem> {
    const about = await this.find()
    const valueItem = new ValueItem();
    valueItem.icon = dto.icon;
    valueItem.title = dto.title;
    valueItem.description = dto.description;
    valueItem.values = about.values

    return this.aboutRepository.createValueItem(valueItem);
  }
  
  async updateValueItem(id: number, dto: ValueItemCreateDto): Promise<ValueItem> {
    const about = await this.find();
    const valueItem = await this.aboutRepository.findValueItem(id)
    if (!valueItem) throw Error(`ValueItem with id ${id} not found`)
    valueItem.icon = dto.icon;
    valueItem.title = dto.title;
    valueItem.description = dto.description;
    
    return this.aboutRepository.updateValueItem(valueItem);
  }

  async deleteValueItem(id: number): Promise<void> {
    return this.aboutRepository.deleteValueItem(id)
  }
}
