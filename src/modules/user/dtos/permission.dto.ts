import { IsString } from 'class-validator';

export class PermissionDto {
  id!: number;
  name!: string;
  description!: string;
}

export class CreatePermissionDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
