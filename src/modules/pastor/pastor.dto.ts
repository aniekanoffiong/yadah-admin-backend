import {
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AchievementDto {
  id!: number;
  icon!: string;
  text!: string;
}

export class MinistryFocusDto {
  id!: number;
  title!: string;
  content!: string;
}

export class PastorDto {
  id!: number;
  image!: string;
  role!: string;
  name!: string;
  description!: string;
  quote!: string;
  achievements!: AchievementDto[];
  ministry?: MinistryFocusDto;
}

// For creation

export class AchievementCreateDto {
  @IsString()
  icon!: string;

  @IsString()
  text!: string;
}

export class MinistryFocusCreateDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}

export class CreatePastorDto {
  @IsString()
  image!: string;

  @IsString()
  role!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  quote!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AchievementCreateDto)
  achievements!: AchievementCreateDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => MinistryFocusCreateDto)
  ministry?: MinistryFocusCreateDto;
}
