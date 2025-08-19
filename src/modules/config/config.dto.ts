export interface ConfigFieldDTO {
  entityName: string;
  fieldName: string;
  label: string;
  fieldType: string;
  optionsJson?: string;
  editable: boolean;
  validationRulesJson?: string;
  displayOrder: number;
  helpText?: string;
}
