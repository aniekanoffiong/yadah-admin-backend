import {
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class SocialDto {
  id!: number;  
  platform?: string;
  icon?: string;
  name?: string;
  url!: string;
}

export class CreateSocialDto {
  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsUrl()
  url!: string;
}

export class CreateSocialOptionDto {
  @IsOptional()
  @IsString()
  label?: string;
  
  @IsString()
  @IsUrl()
  value!: string;
}
