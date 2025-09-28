import {
  IsString,
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

export class ValueItemCreateDto {
  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;
}

export class CreateAboutDto {
  @IsString()
  mainTitle!: string;

  @IsString()
  highlightedTitle!: string;

  @IsString()
  description!: string;

  @IsString()
  storyTitle!: string;

  @IsString()
  storyContent!: string;

  @IsString()
  valuesTitle!: string;

  @IsString()
  valuesSubtitle!: string;
}
