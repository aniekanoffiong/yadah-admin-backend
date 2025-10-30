import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { CreateSocialOptionDto, SocialDto } from '../social/social.dto';

export class ContactInfoDto {
  id!: number;
  title!: string;
  subtitle!: string;
  address!: string;
  email!: string;
  phones!: string[];
  letLong!: number[];
  socialPlatforms?: SocialDto[];
  social?: {
    title: string,
    platforms: SocialDto[],
  }
}

export class ContactInfoPublicDto {
  id!: number;
  title!: string;
  subtitle!: string;
  address!: {
    title: string;
    location: string;
    email: string
  }
  contact!: {
    title: string;
    phones: Array<string>;
    latLong: Array<number>;
    mapAddress: string;
    chat: string;
  }
  social?: {
    title: string,
    platforms: SocialDto[],
  }
}

export class CreateContactInfoDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  address!: string;

  @IsString()
  email!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  phones!: string[];

  @IsArray()
  @ArrayNotEmpty()
  letLong!: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  socialPlatforms?: CreateSocialOptionDto[];
}
