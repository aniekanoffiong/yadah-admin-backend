import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class GalleryItemDto {
  id!: number;
  src!: string;
  alt!: string;
  caption!: string;
  date!: Date;
  tags: {value: number, label: string}[] = [];
}

export class CreateGalleryItemDto {
  @IsString()
  src!: string;

  @IsString()
  alt!: string;

  @IsString()
  caption!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectOption)
  tags?: SelectOption[]
}

export class GalleryItemResponseDto {
  title!: string
  subtitle!: string
  images!: GalleryImageItem[]
}

export class GalleryImageItem {
  src!: string
  alt!: string
  text!: string
}

export class SelectOption {
  label!: string
  value!: string | number
}
