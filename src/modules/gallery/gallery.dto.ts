import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class GalleryItemDto {
  id!: number;
  src!: string;
  alt!: string;
  title!: string;
  category?: string;
  size?: string;
}

export class CreateGalleryItemDto {
  @IsString()
  src!: string;

  @IsString()
  alt!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsArray()
  tags?: string[]
}
