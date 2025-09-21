import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ConfigEntityDTO {
  id!: number;
  entityName!: string;
  multipleOccurrence: boolean | undefined;
  maxOccurrence?: number;
  authorizations?: string;
  subEntities?: ConfigEntityDTO[];
  fields!: ConfigEntityFieldDTO[];
}

export class ConfigEntityFieldDTO {
  id!: number;
  fieldName!: string;
  label!: string;
  fieldType!: string;
  optionsJson?: string;
  editable!: boolean;
  styling?: string;
  validationRulesJson?: string;
  displayOrder!: number;
  helpText?: string;
  multipleOccurrence: boolean | undefined;
}


export class CreateConfigEntityDto {
  @IsNotEmpty()
  @IsString()
  entityName!: string;

  @IsOptional()
  @IsString()
  multipleOccurrence?: boolean = false

  @IsOptional()
  @IsNumber()
  maxOccurrence?: number;

  @IsOptional()
  @IsString()
  authorizations?: string;

  @IsOptional()
  @IsArray()
  fields: CreateConfigFieldDto[] = [];

  @IsOptional()
  @IsArray()
  subEntities?: CreateConfigEntityDto[] = [];
}

export class UpdateConfigEntityDto {
  @IsNotEmpty()
  @IsString()
  entityName?: string;

  @IsOptional()
  @IsString()
  multipleOccurrence?: boolean

  @IsOptional()
  @IsNumber()
  maxOccurrence?: number;

  @IsOptional()
  @IsString()
  authorizations?: string;

  @IsOptional()
  @IsArray()
  fields: CreateConfigFieldDto[] = [];
}

export class CreateConfigFieldDto {
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
  multipleOccurrence?: boolean = false
}

export type EntityType = 
  | "about" | "auth" | "belief" | "config" | "contact" | "cta" 
  | "event" | "footer" | "gallery" | "growInFaith" | "hero" | "itemTag" 
  | "ministries" | "pastor" | "sermon" | "siteLinks" | "social" 
  | "statistics" | "twoFactor" | "scheduledProgram" | "live" | "paymentOption";

export interface EntityMetadata {
  entityType: EntityType;
  multipleOccurrence: boolean;
  canLinkTo?: EntityType[]; // For many-to-many relationships
  linkFields?: string[]; // Fields that can be linked to other entities
}
