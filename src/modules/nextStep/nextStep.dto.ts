import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { NextStepVariants } from './nextStep.entity';

export class NextStepDto {
  id!: number;

  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  variant?: string;

  @IsOptional()
  items?: NextStepItemDto;
}

export class NextStepItemDto {
  id!: number;

  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  buttonText?: string;

  @IsString()
  @IsOptional()
  buttonLink?: string;
}

export class CreateNextStepDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  @IsOptional()
  variant: NextStepVariants = NextStepVariants.StandardNextStep

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NextStepItemDto)
  items!: NextStepItemDto[];
}

export class UpdateNextStepItemDto {
  @IsString()
  icon!: string;

  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  buttonText?: string;

  @IsString()
  @IsOptional()
  buttonLink?: string;
}
