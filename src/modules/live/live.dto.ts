import { IsString, IsBoolean, IsOptional, IsUrl, IsNotEmpty, IsDateString } from 'class-validator';

export class WatchLiveDto {
  id!: number;
  label!: string;
  active!: boolean;
}

export class CreateWatchLiveDto {
  @IsNotEmpty()
  @IsUrl()
  videoUrl!: string;
  
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsDateString()
  date: string = new Date().toISOString();

  @IsNotEmpty()
  @IsString()
  startTime!: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isLive?: boolean;
}

