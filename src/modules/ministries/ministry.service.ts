import { MinistryRepository } from './ministry.repository';
import { CreateMinistryDto } from './ministry.dto';
import { Ministry, MinistryActivity } from './ministry.entity';

export class MinistryService {
  private ministryRepository: MinistryRepository;

  constructor(ministryRepository?: MinistryRepository) {
    this.ministryRepository = ministryRepository || new MinistryRepository();
  }

  async findAll(): Promise<Ministry[]> {
    return this.ministryRepository.findAll();
  }

  async findOne(id: number): Promise<Ministry> {
    const ministry = await this.ministryRepository.findOne(id);
    if (!ministry) throw new Error(`Ministry with id ${id} not found`);
    return ministry;
  }

  async create(dto: CreateMinistryDto): Promise<Ministry> {
    const ministry = new Ministry();
    ministry.icon = dto.icon;
    ministry.title = dto.title;
    ministry.description = dto.description;
    ministry.meetingTime = dto.meetingTime ?? undefined;
    ministry.location = dto.location;
    ministry.leader = dto.leader;

    ministry.activities = dto.activities?.map(actDto => {
      const activity = new MinistryActivity();
      activity.activityName = actDto.activityName;
      return activity;
    });

    return this.ministryRepository.create(ministry);
  }

  async update(id: number, dto: CreateMinistryDto): Promise<Ministry> {
    const ministry = await this.findOne(id);
    ministry.icon = dto.icon;
    ministry.title = dto.title;
    ministry.description = dto.description;
    ministry.meetingTime = dto.meetingTime ?? undefined;
    ministry.location = dto.location;
    ministry.leader = dto.leader;

    await this.ministryRepository.deleteActivitiesByMinistryId(id);
    
    ministry.activities = dto.activities?.map(actDto => {
      const activity = new MinistryActivity();
      activity.activityName = actDto.activityName;
      return activity;
    });

    return this.ministryRepository.update(ministry);
  }

  async delete(id: number): Promise<void> {
    await this.ministryRepository.delete(id);
  }
}
