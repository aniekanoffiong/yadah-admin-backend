import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ItemTagDto } from '../itemTag/itemTag.dto';

export class EventDto {
  id!: number;
  title!: string;
  date!: string;
  location!: string;
  description?: string;
  image!: string;
  tags!: ItemTagDto[];
}

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate!: Date;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;
}
