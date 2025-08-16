import { ObjectId } from 'typeorm';
import { UserModel } from '../user.model';

export class UserResponseDTO {
  id: ObjectId;
  name: string;
  email: string;
  mobile: string;
  token?: string;

  static toResponse(user: UserModel, token?: string | undefined): UserResponseDTO {
    const userDTO = new UserResponseDTO();
    userDTO.id = user._id;
    userDTO.name = user.name;
    userDTO.email = user.email;
    userDTO.mobile = user.mobile;
    if (token) {
      userDTO.token = token;
    }

    return userDTO;
  }
}
