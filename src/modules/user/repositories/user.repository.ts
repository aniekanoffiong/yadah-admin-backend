import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../../../database/data-source';
import { RegisterDto } from '../../auth/dtos/register.dto';
import { LoginDto } from '../../auth/dtos/login.dto';
import InvalidCredentialsException from '../../../exceptions/invalidCredentials.exception';
import UserNotFoundException from '../exceptions/userNotFound.exception';
import UserUpdatePasswordRequestDto from '../dtos/userUpdatePasswordRequest.dto';
import UserPasswordResetDataDto from '../dtos/userPasswordResetData.dto';
import ValidationException from '../../../exceptions/validation.exception';
import UserUpdateRequestDto from '../dtos/userUpdateRequest.dto';
import bcrypt from 'bcrypt';
import { Role } from '../entities/role.entity';
import { RolesEnum } from '../../../enum/roles.enum';

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findAll(permittedRoles: RolesEnum[]): Promise<User[]> {
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.name IN (:...permittedRoles)', { permittedRoles })
      .getMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id }, relations: ['roles', 'roles.permissions'] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email }, relations: ['roles', 'roles.permissions'] });
  }

  async update(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async create(data: RegisterDto, roles: Role[]): Promise<User> {
    await this.validateUserExistence(data);
    const userData: User = await this.repo.create({
      ...data,
      roles,
      password: await this.hashPassword(data.password),
    });
    const user = await this.repo.save(userData);
    console.info(`Successfully saved user data - ${user}`);
    return user;
  }

  async login(data: LoginDto): Promise<User> {
    const user: User | null = await this.retrieveViaEmail(data.email);
    if (!user) {
      console.warn(`User account not found for account with email ${data.email}`);
      throw new InvalidCredentialsException();
    }
    const passwordConfirm = await this.verifyPassword(data.password, user.password);
    if (!passwordConfirm) {
      console.warn(`User password verification failed for account ${data.email}`);
      throw new InvalidCredentialsException();
    }
    console.info(`Login successful for account with email ${data.email}`);
    return user
  }

  async retrieveUser(userId: number): Promise<User> {
    const user = await this.retrieveViaId(userId);
    if (!user) {
      console.warn(`User not found for id ${userId}`);
      throw new UserNotFoundException();
    }
    return user;
  }

  async updateUser(userId: number, data: UserUpdateRequestDto): Promise<User> {
    let user = await this.retrieveViaId(userId);
    if (user) {
      user = await this.updateUserData(user, data);
      return user;
    }
    throw new UserNotFoundException();
  }

  async validateAndHashPassword(
    userId: number,
    data: UserUpdatePasswordRequestDto,
  ): Promise<UserPasswordResetDataDto> {
    if (data.currentPassword === data.newPassword) {
      throw new ValidationException('The current and new password cannot be the same');
    }
    const user = await this.retrieveViaId(userId);
    if (user) {
      if (await this.verifyPassword(data.currentPassword, user.password)) {
        return {
          user,
          hashPassword: await this.hashPassword(data.newPassword),
        };
      }
      throw new InvalidCredentialsException();
    }
    throw new UserNotFoundException();
  }

  async updatePassword(userId: number, hashPassword: string): Promise<User> {
    let user = await this.retrieveViaId(userId);
    if (user) {
      user = await this.updateUserPassword(user, hashPassword);
      return user;
    }
    throw new UserNotFoundException();
  }

  private async validateUserExistence(data: RegisterDto) {
    const existingUser: User | null = await this.retrieveExistingUser(data);
    if (existingUser) {
      console.warn(`User account with email - ${data.email} already exists.`);
      throw new ValidationException('User account already exist');
    }
  }

  private async retrieveExistingUser(data: RegisterDto): Promise<User | null> {
    return await this.repo.findOne({
      where: { email: data.email },
    });
  }

  private async retrieveViaEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  private async retrieveViaId(userId: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id: userId } });
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  private async updateUserData(user: User, data: UserUpdateRequestDto): Promise<User> {
    user.name = data.name || user.name;
    user.email = data.email || user.email;
    this.repo.save(user);
    return user;
  }

  private async updateUserPassword(user: User, hashPassword: string): Promise<User> {
    user.password = hashPassword;
    this.repo.save(user);
    return user;
  }
}
