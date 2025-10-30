import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { SpecificPage } from '../../utils/enums';

export class HeroDto {
  id!: number;

  @IsString()
  page!: string;

  @IsString()
  backgroundImage!: string;

  @IsString()
  title!: string;

  @IsOptional()
  subtitle?: string;

  @IsOptional()
  showControls?: boolean;

  @IsOptional()
  volunteerProgramText?: string;

  @IsOptional()
  volunteerProgramLink?: string;
}

export class CreateHeroDto {
  @IsString()
  page!: SpecificPage;

  @IsOptional()
  @IsString()
  image!: string;

  @IsOptional()
  @IsString()
  video!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  subtitle!: string | null;

  @IsOptional()
  @IsBoolean()
  showControls?: boolean;

  @IsOptional()
  @IsString()
  volunteerProgramText?: string;

  @IsOptional()
  @IsString()
  volunteerProgramLink?: string;
}

export class HeroResponseDto {
  title!: string
  subtitle?: string | null
  backgroundImage?: string
  video?: string
  volunteerProgram!: { text?: string | null }
}