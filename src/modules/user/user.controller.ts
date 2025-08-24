import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './/dtos/user.dto';
import { CustomRequest } from '../../interfaces/customRequest';
import { User } from './entities/user.entity';

export class UserController {
  constructor(
    private userService: UserService = new UserService()
  ) {}

  getAll = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user
      const stats = await this.userService.findAll(user!.userRole());
      res.json({ data: stats });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findOne(id);
      res.json({ data: this.toDto(user) });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateUserDto;
      const stats = await this.userService.create(dto);
      res.status(201).json({ data: stats });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateUserDto;
      const stats = await this.userService.update(id, dto);
      res.json({ data: stats });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.userService.delete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  private toDto(user: User) {
    const userDto = new UserDto()
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.roles = user.roles.map(r => r.name);
    return userDto;
  }
}
