import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class EventDto {
  id!: number;
  title!: string;
  startDate!: Date;
  endDate!: Date;
  location!: string;
  description?: string;
  image!: string;
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
