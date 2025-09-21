import { IsEmail, IsOptional, IsString } from 'class-validator';

class UserUpdateRequestDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export default UserUpdateRequestDto;
