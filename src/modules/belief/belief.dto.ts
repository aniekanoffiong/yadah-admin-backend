import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BeliefDto {
  id!: number;
  title!: string;
  subtitle!: string;
  items!: BeliefItemDto[];
}

export class CreateBeliefDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBeliefItemDto)
  items!: Array<UpdateBeliefItemDto>
}
export class BeliefItemDto {
  id!: number;
  title!: string;
  content!: string;
}

export class CreateBeliefItemDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}

export class UpdateBeliefItemDto {
  @IsNumber()
  id?: number;

  @IsString()
  title!: string;

  @IsString()
  content!: string;
}
