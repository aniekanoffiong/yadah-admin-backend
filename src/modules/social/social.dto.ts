import {
  IsString,
  IsUrl,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Platform } from '../../utils/enums';

export class SocialDto {
  id!: number;  
  platform?: Platform;
  icon?: string;
  name?: string;
  url!: string;
}

export class CreateSocialDto {
  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

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
