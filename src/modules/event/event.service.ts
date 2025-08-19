import { Event } from './event.entity';
import { EventDto } from './event.dto';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './event.dto';

export class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository?: EventRepository) {
    this.eventRepository = eventRepository || new EventRepository()
  }

  async create(eventDto: CreateEventDto): Promise<Event> {
    const event = new Event();
    event.title = eventDto.title;
    event.description = eventDto.description;
    event.startDate = eventDto.startDate;
    event.endDate = eventDto.endDate;
    event.location = eventDto.location;
    event.image = eventDto.image;
    return this.eventRepository.create(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async findById(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findOne(id);
    if (!event) throw new Error(`Event with id ${id} not found`);
    return event;
  }

  async update(id: number, eventDto: Partial<EventDto>): Promise<Event | null> {
    const event = await this.findById(id);
    if (!event) {
      return null;
    }
    Object.assign(event, eventDto);
    return this.eventRepository.update(event);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
