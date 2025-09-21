import { DayOfWeek } from '../../utils/dayOfWeek';
import { CreateScheduledProgramDto, ScheduledProgramDto } from './scheduledProgram.dto';
import { ScheduledProgram } from './scheduledProgram.entity';
import { ScheduledProgramRepository } from './scheduledProgram.repository';

export class ScheduledProgramService {
  private scheduledProgramRepository: ScheduledProgramRepository;

  constructor(scheduledProgramRepository?: ScheduledProgramRepository) {
    this.scheduledProgramRepository = scheduledProgramRepository || new ScheduledProgramRepository()
  }

  async create(scheduledProgramDto: CreateScheduledProgramDto): Promise<ScheduledProgram> {
    const scheduledProgram = new ScheduledProgram();
    scheduledProgram.title = scheduledProgramDto.title;
    scheduledProgram.description = scheduledProgramDto.description;
    scheduledProgram.startTime = scheduledProgramDto.startTime;
    scheduledProgram.endTime = scheduledProgramDto.endTime;
    scheduledProgram.location = scheduledProgramDto.location;
    scheduledProgram.icon = scheduledProgramDto.icon;
    scheduledProgram.image = scheduledProgramDto.image;
    return this.scheduledProgramRepository.create(scheduledProgram);
  }

  async createRegularProgram(scheduledProgramDto: CreateScheduledProgramDto): Promise<ScheduledProgram> {
    const normalizedDay = scheduledProgramDto.scheduledDay.charAt(0).toUpperCase() + scheduledProgramDto.scheduledDay.slice(1).toLowerCase()
    const scheduledProgram = new ScheduledProgram();
    scheduledProgram.title = scheduledProgramDto.title;
    scheduledProgram.scheduledDay = DayOfWeek[normalizedDay as keyof typeof DayOfWeek];
    scheduledProgram.startTime = scheduledProgramDto.startTime;
    scheduledProgram.endTime = scheduledProgramDto.endTime;
    scheduledProgram.location = scheduledProgramDto.location;
    scheduledProgram.icon = scheduledProgramDto.icon;
    scheduledProgram.image = scheduledProgramDto.image;
    return this.scheduledProgramRepository.create(scheduledProgram);
  }

  async findAll(): Promise<ScheduledProgram[]> {
    return this.scheduledProgramRepository.findAll();
  }

  async currentProgram(date: Date): Promise<ScheduledProgram | null> {
    return this.scheduledProgramRepository.currentProgram(date)
  }

  async findUpcomingScheduledPrograms(limit: number = 8): Promise<ScheduledProgram[]> {
    return this.scheduledProgramRepository.getRecentScheduledPrograms(limit);
  }

  async findUpcomingServices(limit: number = 4): Promise<ScheduledProgram[]> {
    return this.scheduledProgramRepository.getUpcomingServices(limit);
  }

  async findById(id: number): Promise<ScheduledProgram | null> {
    const scheduledProgram = await this.scheduledProgramRepository.findOne(id);
    if (!scheduledProgram) throw new Error(`ScheduledProgram with id ${id} not found`);
    return scheduledProgram;
  }

  async update(id: number, scheduledProgramDto: Partial<ScheduledProgramDto>): Promise<ScheduledProgram | null> {
    const scheduledProgram = await this.findById(id);
    if (!scheduledProgram) {
      return null;
    }
    Object.assign(scheduledProgram, scheduledProgramDto);
    return this.scheduledProgramRepository.update(scheduledProgram);
  }

  async remove(id: number): Promise<void> {
    await this.scheduledProgramRepository.delete(id);
  }
}
