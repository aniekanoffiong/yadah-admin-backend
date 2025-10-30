import { ContactMessageRepository } from './contactMessage.repository';
import { CreateContactMessageDto } from './contactMesasge.dto';
import { ContactMessage } from './contactMessage.entity';

export class ContactMessageService {
  private repo: ContactMessageRepository;

  constructor(repo?: ContactMessageRepository) {
    this.repo = repo || new ContactMessageRepository();
  }

  async create(dto: CreateContactMessageDto): Promise<ContactMessage> {
    const message = new ContactMessage();
    message.name = dto.name;
    message.email = dto.email;
    message.phone = dto.phone;
    message.subject = dto.subject;
    message.message = dto.message;
    return this.repo.create(message);
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<ContactMessage | null> {
    return this.repo.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}