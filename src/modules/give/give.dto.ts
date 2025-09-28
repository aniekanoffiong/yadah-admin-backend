import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsString, Validate, ValidateNested } from 'class-validator';
import { GivingArea, SupportedCurrency } from './give.entity';

export enum CurrencySymbol {
  GBP = "GBP",
  USD = "USD",
  EUR = "EUR",
}

export class CreateGiveDto {
  @IsString()
  optionsHeading!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCurrencyDto)
  currencies!: CreateCurrencyDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGivingAreaDto)
  givingArea!: CreateGivingAreaDto[];
}

export class GiveDto {
  id!: number;
  optionsHeading!: string;
  currencies!: CurrencyDto[];
  givingArea!: GivingAreaDto[];
}

export class CurrencyDto {
  id!: number;
  name!: string;
  symbol!: string;
}

export class GivingAreaDto {
  id!: number; 
  title!: string;
  description!: string;
}

export class UpdateGiveDto {
  @IsNotEmpty()
  optionHeading!: string;
}

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEnum(CurrencySymbol)
  symbol!: CurrencySymbol;
}

export class CreateGivingAreaDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}

export function toCurrencyDto(currency: SupportedCurrency): CurrencyDto {
  return {
    id: currency.id,
    name: currency.name,
    symbol: currency.symbol,
  }
}

export function toGivingAreaDto(givingArea: GivingArea): GivingAreaDto {
  return {
    id: givingArea.id,
    title: givingArea.title,
    description: givingArea.description,
  }
}
