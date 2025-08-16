import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { Department } from "../entities/OldDepartment";
import { validateEntity } from "../utils/validate";

const departmentRepository = AppDataSource.getRepository(Department);

export const listDepartments = async (req: Request, res: Response) => {
  const departments = await departmentRepository.find();
  res.json(departments);
};

export const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await departmentRepository.findOneOrFail({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.json(department);
  } catch {
    res.status(404).json({ error: "Department not found" });
  }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
  const department = departmentRepository.create(req.body);

  const errors = await validateEntity(department);
  if (errors.length > 0) {
    return next(errors);
  }

  await departmentRepository.save(department);
  res.status(201).json(department);
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await departmentRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });

    departmentRepository.merge(department, req.body);

    const errors = await validateEntity(department);
    if (errors.length > 0) {
      return next(errors);
    }

    await departmentRepository.save(department);
    res.json(department);
  } catch {
    res.status(404).json({ error: "Department not found" });
  }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await departmentRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });
    await departmentRepository.remove(department);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Department not found" });
  }
};
