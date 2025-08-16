import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { SocialLink } from '../social/social.entity';
import { CreateSocialDto } from '../social/social.dto';

export class ContactInfoDto {
  id!: number;
  title!: string;
  subtitle!: string;
  addressTitle!: string;
  location!: string;
  email!: string;
  phones!: string[];
  chat!: string;
  socialPlatforms!: SocialLink[];
}

export class CreateContactInfoDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsString()
  addressTitle!: string;

  @IsString()
  location!: string;

  @IsString()
  email!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  phones!: string[];

  @IsString()
  chat!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  socialPlatforms?: CreateSocialDto[];
}
