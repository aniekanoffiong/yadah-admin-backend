import {
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSocialOptionDto, SocialDto } from '../social/social.dto';
import { CreateSiteLinkOptionDto, SiteLinkDto } from '../siteLinks/siteLink.dto';

export class FooterDto {
  id!: number;

  newsletterTitle!: string;

  newsletterSubtitle!: string;

  logoSrc!: string;

  logoAlt!: string;

  description!: string;

  quickLinks!: SiteLinkDto[];

  ministries!: SiteLinkDto[];

  address!: string;

  phone!: string;

  email!: string;

  schedule!: any;

  legalLinks!: SiteLinkDto[];

  copyright!: string;

  socialLinks!: SiteLinkDto[];
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
  @ValidateNested({ each: true })
  @Type(() => CreateSiteLinkOptionDto)  
  quickLinks!: CreateSiteLinkOptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSiteLinkOptionDto)
  ministries!: CreateSiteLinkOptionDto[];

  @IsString()
  address!: string;

  @IsString()
  phone!: string;

  @IsString()
  email!: string;

  schedule!: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSiteLinkOptionDto)
  legalLinks!: CreateSiteLinkOptionDto[];

  @IsString()
  copyright!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialOptionDto)
  socialLinks!: CreateSocialOptionDto[];
}

export class FooterResponseDto {
  newsletter!: {
    title: string,
    subtitle: string,
  }
  church!: {
    logo: {
      text: string,
      icon: string,
    },
    description: string,
    socialLinks: Array<SocialDto>
  }
  contact!: {
    email: string,
    phone: string,
    address: string,
    schedule: Record<string, string>[],
  }
  socialLinks!: Array<SiteLinkDto>
  quickLinks!: Array<SiteLinkDto>
  ministries!: Array<SiteLinkDto>
  legal!: Array<SiteLinkDto>
  copyright!: string
}
