import { UserModel } from '../user.model';

class UserPasswordResetDataDto {
  user: UserModel;
  hashPassword: string;
}

export default UserPasswordResetDataDto;
