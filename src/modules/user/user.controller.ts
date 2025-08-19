import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './/dtos/user.dto';
import { CustomRequest } from '../../interfaces/customRequest';

export class UserController {
  constructor(
    private userService: UserService = new UserService()
  ) {}

  getAll = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user
      const stats = await this.userService.findAll(user!.userRole());
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const stats = await this.userService.findOne(id);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = req.body as CreateUserDto;
      const stats = await this.userService.create(dto);
      res.status(201).json(stats);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const dto = req.body as CreateUserDto;
      const stats = await this.userService.update(id, dto);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.userService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
