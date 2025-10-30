import { IsEmail, IsOptional, IsString } from "class-validator";

export class ContactMessageDto {
  name!: string;
  email!: string;
  phone?: string;
  subject!: string;
  message!: string;
}

export class CreateContactMessageDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  subject!: string;

  @IsString()
  message!: string;
}

