import { CallToActionRepository } from './cta.repository';
import { CreateCallToActionDto } from './cta.dto';
import { CallToAction, CTAButton } from './cta.entity';
import { SpecificPage, SpecificPageSection } from '../../utils/enums';

export class CallToActionService {
  private ctaRepository: CallToActionRepository;

  constructor(ctaRepository?: CallToActionRepository) {
    this.ctaRepository = ctaRepository || new CallToActionRepository();
  }

  async findAll(): Promise<CallToAction[]> {
    return this.ctaRepository.findAll();
  }

  async findOne(id: number): Promise<CallToAction> {
    const cta = await this.ctaRepository.findOne(id);
    if (!cta) throw new Error(`CallToAction with id ${id} not found`);
    return cta;
  }

  async findByPage(page: SpecificPage): Promise<CallToAction> {
    const cta = await this.ctaRepository.findByPage(page);
    if (!cta) throw new Error(`CallToAction with page ${page} not found`);
    return cta;
  }

  async findByPageSection(page: SpecificPage, section: SpecificPageSection): Promise<CallToAction> {
    const cta = await this.ctaRepository.findByPageSection(page, section);
    if (!cta) throw new Error(`CallToAction with page ${page} and section ${section} not found`);
    return cta;
  }

  async create(dto: CreateCallToActionDto): Promise<CallToAction> {
    const cta = new CallToAction();
    cta.title = dto.title;
    cta.subtitle = dto.subtitle;
    cta.buttons = dto.buttons.map(btnDto => {
      const btn = new CTAButton();
      btn.text = btnDto.text;
      btn.variant = btnDto.variant;
      btn.icon = btnDto.icon;
      return btn;
    });

    return this.ctaRepository.create(cta);
  }

  async update(id: number, dto: CreateCallToActionDto): Promise<CallToAction> {
    const cta = await this.findOne(id);
    cta.title = dto.title;
    cta.subtitle = dto.subtitle;

    await this.ctaRepository.deleteButtons(id);

    cta.buttons = dto.buttons.map(btnDto => {
      const btn = new CTAButton();
      btn.text = btnDto.text;
      btn.variant = btnDto.variant;
      btn.icon = btnDto.icon;
      return btn;
    });

    return this.ctaRepository.update(cta);
  }

  async delete(id: number): Promise<void> {
    await this.ctaRepository.delete(id);
  }
}
