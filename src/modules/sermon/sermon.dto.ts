import { IsString, IsBoolean, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { SelectOption } from '../gallery/gallery.dto';
import { Type } from 'class-transformer';

export class SermonDto {
  id!: number;

  title!: string;

  minister!: string;

  date!: string; // ISO string

  image!: string;

  duration!: string;
  
  featured!: boolean;

  videoUrl?: string;

  tags!: string[];
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
  @ValidateNested({ each: true })
  @Type(() => SelectOption)
  tags?: SelectOption[];
}
