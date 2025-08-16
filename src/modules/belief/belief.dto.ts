import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class BeliefDto {
  id!: number;
  title!: string;
  content!: string;
}

export class CreateBeliefDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}
