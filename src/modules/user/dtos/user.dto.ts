import { IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoleDto } from './role.dto';

export class UserDto {
  id!: number;
  name!: string;
  email!: string;
  roles!: RoleDto[];
}

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles!: RoleDto[];
}
