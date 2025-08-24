import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { CustomRequest } from '../../interfaces/customRequest';
import { LoginHistory } from './loginHistory.entity';
import { UAParser } from 'ua-parser-js';
import { LoginInfoDto } from './loginHistory.dto';
import { User } from '../user/entities/user.entity';

export class LoginHistoryService {
  private loginHistoryRepository: Repository<LoginHistory>;
  private parser = new UAParser();

  constructor() {
    this.loginHistoryRepository = AppDataSource.getRepository(LoginHistory);
  }

  async getAll(): Promise<LoginHistory[]> {
    return this.loginHistoryRepository.find();
  }

  async getByUserId(userId: number): Promise<LoginInfoDto[]> {
    const loginHistory = await this.loginHistoryRepository
      .createQueryBuilder("login_history")
      .where("userId = :userId", { userId })
      .getMany();
    return loginHistory.map(({ id, user, deviceInfo}) => ({
      id, userId: user.id, deviceData: this.parser.setUA(deviceInfo).getResult()
    }));
  }

  async create(req: CustomRequest, user: User): Promise<void> {
    this.loginHistoryRepository.create({ 
      user: user,
      deviceInfo: req.headers['user-agent'],
    });
  }
}
