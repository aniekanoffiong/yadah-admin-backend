import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StatItemDto {
  id!: number;
  number!: string;
  label!: string;
  icon?: string;
}

export class StatisticsDto {
  id!: number;

  @IsOptional()
  backgroundImage?: string;

  statItems!: StatItemDto[];
}

export class CreateStatItemDto {
  @IsString()
  number!: string;

  @IsString()
  label!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class CreateStatisticsDto {
  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStatItemDto)
  statItems!: CreateStatItemDto[];
}
