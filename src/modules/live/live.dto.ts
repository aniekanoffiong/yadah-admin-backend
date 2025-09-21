import { IsString, IsBoolean, IsOptional, IsUrl, IsNotEmpty, IsDateString } from 'class-validator';

export class WatchLiveDto {
  id!: number;
  videoUrl!: string;
  videoId!: string | null;
  title!: string;
  date!: Date;
  startTime!: string;
  endTime!: string;
  isLive!: boolean;
  featured!: boolean;
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
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  isLive?: boolean;
}

