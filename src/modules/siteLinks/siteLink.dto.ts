import {
  IsString,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class SiteLinkDto{
  id!: number;
  label!: string;
  url!: string;
}

export class CreateSiteLinkDto {
  @IsOptional()
  @IsString()
  label!: string;

  @IsString()
  @IsUrl()
  url!: string;
}
