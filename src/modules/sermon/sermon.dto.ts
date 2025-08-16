import { IsString, IsBoolean, IsDateString, IsArray } from 'class-validator';

export class SermonDto {
  id!: number;

  title!: string;

  minister!: string;

  date!: string; // ISO string

  image!: string;

  duration!: string;
  
  featured!: boolean;

  videoUrl!: string;
}

export class CreateSermonDto {
  @IsString()
  title!: string;

  @IsString()
  minister!: string;

  @IsDateString()
  date!: string;

  @IsString()
  image!: string;

  @IsString()
  duration!: string;

  @IsBoolean()
  featured!: boolean;

  @IsString()
  videoUrl!: string;

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
