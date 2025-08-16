import {
  IsString,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StoryStatDto {
  id!: number;
  text!: string;
}

export class StoryDto {
  id!: number;
  title!: string;
  content!: string;
  stats!: StoryStatDto[];
}

export class ValueItemDto {
  id!: number;
  icon!: string;
  title!: string;
  description!: string;
}

export class ValuesDto {
  id!: number;
  title!: string;
  subtitle!: string;
  items!: ValueItemDto[];
}

export class AboutDto {
  id!: number;
  mainTitle!: string;
  highlightedTitle!: string;
  description!: string;
  story?: StoryDto;
  values?: ValuesDto;
}

export class StoryStatCreateDto {
  @IsString()
  text!: string;
}

export class StoryCreateDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoryStatCreateDto)
  stats!: StoryStatCreateDto[];
}

export class ValueItemCreateDto {
  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;
}

export class ValuesCreateDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValueItemCreateDto)
  items!: ValueItemCreateDto[];
}

export class CreateAboutDto {
  @IsString()
  mainTitle!: string;

  @IsString()
  highlightedTitle!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => StoryCreateDto)
  story?: StoryCreateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ValuesCreateDto)
  values?: ValuesCreateDto;
}
