import {
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SocialDto } from '../social/social.dto';
import { CreateSiteLinkDto } from '../siteLinks/siteLink.dto';

export class FooterDto {
  id!: number;

  newsletterTitle!: string;

  newsletterSubtitle!: string;

  logoSrc!: string;

  logoAlt!: string;

  description!: string;

  quickLinks!: string[];

  ministries!: string[];

  address!: string;

  phone!: string;

  email!: string;

  schedule!: any;

  legalLinks!: string[];

  copyright!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDto)
  socialLinks!: SocialDto[];
}

export class CreateFooterDto {
  @IsString()
  newsletterTitle!: string;

  @IsString()
  newsletterSubtitle!: string;

  @IsString()
  logoSrc!: string;

  @IsString()
  logoAlt!: string;

  @IsString()
  description!: string;

  @IsArray()
  quickLinks!: CreateSiteLinkDto[];

  @IsArray()
  ministries!: CreateSiteLinkDto[];

  @IsString()
  address!: string;

  @IsString()
  phone!: string;

  @IsString()
  email!: string;

  schedule!: any;

  @IsArray()
  legalLinks!: CreateSiteLinkDto[];

  @IsString()
  copyright!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDto)
  socialLinks!: SocialDto[];
}
