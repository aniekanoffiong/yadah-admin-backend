import { LoginDto } from '../auth/dtos/login.dto';
import { TwoFactorService } from '../twoFactor/twoFactor.service';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterDto } from './dtos/register.dto';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { RoleRepository } from '../user/repositories/role.repository';

dotenv.config();

export class AuthService {
  constructor(
    private userRepository: UserRepository = new UserRepository(),
    private roleRepository: RoleRepository = new RoleRepository(),
  ) {}

  async register(data: RegisterDto): Promise<User> {
    const roles = await this.roleRepository.findAllByNames(data.roles.map(role => role.name));
    return await this.userRepository.create(data, roles);
  }

  async login(data: LoginDto): Promise<{user: User, token: string}> {
    const user: User = await this.userRepository.login(data);
    const token = await this.createToken(user);
    return {user, token};
    // previously it was returning a TwoFactorResponseDTO, but now we return a User and Token
    // const twoFactor: TwoFactorModel = await twoFactorService.sendLoginToken(userData);
    // return TwoFactorResponseDTO.toResponse(twoFactor);
  }

  // async twoFactorAuth(data: TwoFactorDto, params: TwoFactorParamsDto): Promise<User> {
  //   const twoFactor = await twoFactorRepository.validateTwoFactor(data.code, params.temporaryToken);
  //   const user = await this.userRepository.retrieveUser(twoFactor.userId);
  //   const token = await this.createToken(user);
  //   return user;
  // }

  async createToken(user: User): Promise<string> {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    const jwtValidity = Number(process.env.JWT_VALIDITY);
    return jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, {
      subject: user.email,
      expiresIn: jwtValidity,
    });
  }
}
