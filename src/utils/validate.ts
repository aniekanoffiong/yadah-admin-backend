import { validate as classValidate, ValidationError } from "class-validator";

export async function validateEntity(entity: any): Promise<ValidationError[]> {
  const errors = await classValidate(entity);
  return errors;
}
