import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class ItemTagResponseDto {
  id!: string;
  label!: string;
}

export class ItemTagDto {
  value!: number;
  label!: string;
  active!: boolean;
}

export class CreateItemTagDto {
  @IsString()
  label!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

