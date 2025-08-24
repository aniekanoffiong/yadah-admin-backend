import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { IResult } from 'ua-parser-js';

export class LoginInfoDto {
  id!: number;
  userId!: number;
  deviceData!: IResult; 
}

export class CreateLoginHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: string;
  
  @IsNotEmpty()
  @IsString()
  deviceInfo!: string;
}

