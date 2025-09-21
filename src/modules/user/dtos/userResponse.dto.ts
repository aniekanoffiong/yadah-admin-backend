import { ObjectId } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserResponseDTO {
  id!: number;
  name!: string;
  email!: string;
  mobile?: string;
  token?: string;

  static toResponse(user: User, token?: string | undefined): UserResponseDTO {
    const userDTO = new UserResponseDTO();
    userDTO.id = user.id;
    userDTO.name = user.name;
    userDTO.email = user.email;
    userDTO.mobile = user.mobile;
    if (token) {
      userDTO.token = token;
    }

    return userDTO;
  }
}
