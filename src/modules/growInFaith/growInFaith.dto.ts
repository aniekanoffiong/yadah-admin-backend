import { IsString, IsOptional } from 'class-validator';

export class GrowingInFaithDto {
  id!: number;
  title!: string;
  description!: string;
  secondDescription?: string;
  image!: string;
  buttonText!: string;
  buttonLink!: string;
}

export class CreateGrowInFaithDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  secondDescription?: string;

  @IsString()
  image!: string;

  @IsString()
  buttonText!: string;

  @IsString()
  buttonLink!: string;
}
