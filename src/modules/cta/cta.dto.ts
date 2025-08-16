import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CTAButtonDto {
  id!: number;

  text!: string;

  variant!: string;

  @IsOptional()
  icon?: string;
}

export class CallToActionDto {
  id!: number;

  title!: string;

  subtitle!: string;

  buttons!: CTAButtonDto[];
}

export class CreateCTAButtonDto {
  @IsString()
  text!: string;

  @IsString()
  variant!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class CreateCallToActionDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCTAButtonDto)
  buttons!: CreateCTAButtonDto[];
}
