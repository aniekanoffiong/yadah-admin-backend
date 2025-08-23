import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ConfigFieldDTO {
  entityName!: string;
  fieldName!: string;
  label!: string;
  fieldType!: string;
  optionsJson?: string;
  editable!: boolean;
  validationRulesJson?: string;
  displayOrder!: number;
  helpText?: string;
  multipleOccurrence: boolean = false;
  maxOccurrence?: number;
  authorizations?: string;
}

export class CreateConfigFieldDto {
  @IsNotEmpty()
  @IsString()
  entityName!: string;

  @IsNotEmpty()
  @IsString()
  fieldName!: string;
 
  @IsNotEmpty()
  @IsString()
  label!: string;
  
  @IsNotEmpty()
  @IsString()
  fieldType!: string;

  @IsOptional()
  @IsString()
  optionsJson?: string;
  
  @IsNotEmpty()
  @IsString()
  editable!: boolean;

  @IsOptional()
  @IsString()
  validationRulesJson?: string;
  
  @IsNotEmpty()
  @IsString()
  displayOrder!: number;

  @IsOptional()
  @IsString()
  helpText?: string;

  @IsOptional()
  @IsString()
  multipleOccurrence: boolean = false

  @IsOptional()
  @IsNumber()
  maxOccurrence?: number;

  @IsOptional()
  @IsString()
  authorizations?: string;
}
