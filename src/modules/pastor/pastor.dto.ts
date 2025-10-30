import {
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AchievementDto {
  id!: number;
  icon!: string;
  text!: string;
}

export class JourneyDto {
  id!: number;
  year!: number;
  title!: string;
  subtitle!: string;
  content!: string;
}

export class MinistryFocusDto {
  title?: string;
  content?: string;
}

export class PastorDto {
  id!: number;
  slug!: string;
  image!: string;
  role!: string;
  name!: string;
  description!: string;
  quote!: string;
  achievements!: AchievementDto[];
  ministry?: MinistryFocusDto;
}

export class PastorDetailsDto {
  id!: number;
  slug!: string;
  image!: string;
  role!: string;
  about!: string;
  name!: string;
  description!: string;
  quote!: string;
  others!: string;
  journey!: JourneyDto[];
  achievements!: AchievementDto[];
  ministry?: MinistryFocusDto;
  focus!: MinistryFocusDto[];
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

export class MinistryJourneyItemCreateDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  content!: string;

  @IsNumber()
  year!: number;
}

export class CreatePastorDto {
  @IsString()
  image!: string;

  @IsString()
  role!: string;

  @IsString()
  name!: string;

  @IsString()
  about!: string;

  @IsString()
  description!: string;

  @IsString()
  quote!: string;

  @IsString()
  focusTitle!: string;

  @IsString()
  focusContent!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AchievementCreateDto)
  achievements!: AchievementCreateDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MinistryFocusCreateDto)
  ministry!: MinistryFocusCreateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MinistryJourneyItemCreateDto)
  journeyItems!: MinistryJourneyItemCreateDto[];
}
