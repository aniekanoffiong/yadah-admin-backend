import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleRepository } from './repositories/role.repository';
import { RolesEnum } from '../../enum/roles.enum';
import { Role } from './entities/role.entity';

export class UserService {
  private rolesQueryMap: Record<string, Array<RolesEnum>> = {
    [RolesEnum.SYSTEM_ADMIN.valueOf()]: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
    [RolesEnum.SUPER_ADMIN.valueOf()]: [RolesEnum.USER, RolesEnum.ADMIN],
    [RolesEnum.ADMIN.valueOf()]: [RolesEnum.USER],
    [RolesEnum.USER.valueOf()]: [],
    [RolesEnum.GUEST.valueOf()]: [],
  }
  
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
    return this.userRepository.create(user, roles);
  }

  async findAll(userRole: Role | undefined): Promise<User[]> {
    if (!userRole) return []
    return this.userRepository.findAll(
      this.rolesQueryMap[userRole.name.valueOf()]
    );
  }

  async findOne(id: number): Promise<User> {
    const statistics = await this.userRepository.findById(id);
    if (!statistics) throw new Error(`Statistics with id ${id} not found`);
    return statistics;
  }

  async update(id: number, dto: CreateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.name = dto.name || user.name;
    user.email = dto.email || user.email;
    return this.userRepository.update(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
