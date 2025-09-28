import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MinistryActivityDto {
  @IsString()
  activityName!: string;
}

export class MinistryDto {
  @IsNumber()
  id!: number;

  icon!: string;

  title!: string;

  description!: string;

  meetingTime?: string;

  location?: string;

  leader?: string;

  members?: string;

  activities?: MinistryActivityDto[];
}

export class CreateMinistryDto {
  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  meetingTime!: string;

  @IsString()
  location!: string;

  @IsString()
  leader!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MinistryActivityDto)
  activities!: MinistryActivityDto[];

  @IsString()
  @IsOptional()
  members?: string;
}
