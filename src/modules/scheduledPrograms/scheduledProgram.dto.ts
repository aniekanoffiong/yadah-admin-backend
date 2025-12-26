import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class ScheduledProgramDto {
  id!: number;
  title!: string;
  scheduledDay?: string;
  startTime!: string;
  additionalTimes?: string[];
  endTime!: string;
  location!: string;
  description?: string;
  icon?: string;
  image?: string;
}

export class CreateScheduledProgramDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  scheduledDay!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  startTime!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  endTime!: string;

  @IsOptional()
  additionalTimes!: string[];

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
