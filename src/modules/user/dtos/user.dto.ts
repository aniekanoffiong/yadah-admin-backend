import { IsString, IsEmail, IsEnum } from 'class-validator';
import { RolesEnum } from '../../../enum/roles.enum';
import { User } from '../entities/user.entity';
import { LoginHistory } from '../../loginHistory/loginHistory.entity';

export class UserDto {
  id!: number;
  name!: string;
  email!: string;
  role!: string;
  lastLogin?: LoginHistory;
}

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(RolesEnum)
  role!: RolesEnum;
}
