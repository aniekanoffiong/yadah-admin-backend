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

  meetingTime?: string | null;

  location?: string | null;

  leader?: string | null;

  members?: string | null;

  activities?: MinistryActivityDto[];
}

export class CreateMinistryDto {
  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  meetingTime?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  leader?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MinistryActivityDto)
  activities?: MinistryActivityDto[];

  @IsString()
  @IsOptional()
  members?: string;
}
