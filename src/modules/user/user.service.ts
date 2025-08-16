import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleRepository } from './repositories/role.repository';

export class UserService {
  constructor(
    private userRepository: UserRepository = new UserRepository(),
    private roleRepository: RoleRepository = new RoleRepository()
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const roles = await this.roleRepository.findAllByNames(dto.roles.map(role => role.name));
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, 10);
    user.roles = roles;
    return this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

}
