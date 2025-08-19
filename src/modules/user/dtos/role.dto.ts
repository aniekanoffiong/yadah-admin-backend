import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionDto, CreatePermissionDto } from './permission.dto';

export class RoleDto {
  id!: number;
  name!: string;
  description?: string;
  permissions!: PermissionDto[];
}

export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: CreatePermissionDto[];
}
