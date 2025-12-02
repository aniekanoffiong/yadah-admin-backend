import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { ItemTagDto, ItemTagResponseDto } from '../itemTag/itemTag.dto';


export class GalleryItemPublicResponseDto {
  id!: number;
  src!: string;
  alt!: string;
  caption!: string;
  date!: string;
  tags: ItemTagResponseDto[] = [];
}

export class GalleryItemDto {
  id!: number;
  src!: string;
  alt!: string;
  caption!: string;
  date!: string;
  tags: ItemTagDto[] = [];
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
  instagramLink?: string
  images!: GalleryImageItem[]
}

export class GalleryImageItem {
  src!: string
  alt!: string
  text!: string
}

export class SelectOption {
  @IsString()
  @IsNotEmpty()
  label!: string

  @IsNotEmpty()
  value!: string | number
}
