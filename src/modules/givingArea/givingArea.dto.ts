import { IsString } from 'class-validator';

export class GivingAreaDto {
  id!: number;
  icon!: string;
  title!: string;
  description!: boolean;
}

export class CreateGivingAreaDto {
  @IsString()
  icon!: string;
  
  @IsString()
  title!: string;

  @IsString()
  description!: boolean;
}

