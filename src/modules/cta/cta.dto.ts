import { IsString, IsOptional, IsArray, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CTAButtonDto {
  id!: number;
  text!: string;
  variant!: string;
  url!: string;
  icon?: string;
}

export class CTAAddedInfoDto {
  id!: number;
  number!: string;
  label!: string;
}

export class CallToActionDto {
  id!: number;
  title!: string;
  subtitle!: string;
  backgroundImage?: string;
  buttons!: CTAButtonDto[];
  stats?: CTAAddedInfoDto[];
}

export class CreateCTAButtonDto {
  @IsString()
  text!: string;

  @IsString()
  variant!: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsUrl()
  url!: string;
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
