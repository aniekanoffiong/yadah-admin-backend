import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class StatItemDto {
  id!: number;
  statisticsId!: number;
  number!: number;
  label!: string;
  icon?: string;
}

export class StatisticsDto {
  id?: number;
  
  @IsOptional()
  backgroundImage?: string;

  statItems!: StatItemDto[];
}

export class CreateStatItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumberString()
  parentEntityId?: number;

  @IsOptional()
  @IsNumber()
  statisticsId?: number;

  @IsNumber()
  number!: number;

  @IsString()
  label!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class UpdateStatItemDto {
  @IsNumberString()
  number!: number;

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
