import { User } from '../entities/user.entity';

class UserPasswordResetDataDto {
  user!: User;
  hashPassword!: string;
}

export default UserPasswordResetDataDto;
