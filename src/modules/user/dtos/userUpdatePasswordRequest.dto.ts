import { IsNotEmpty, IsString } from 'class-validator';

class UserUpdatePasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}

export default UserUpdatePasswordRequestDto;
