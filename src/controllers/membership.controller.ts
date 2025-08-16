import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { Membership } from "../entities/OldMembership";
import { validateEntity } from "../utils/validate";

const membershipRepository = AppDataSource.getRepository(Membership);

export const listMemberships = async (req: Request, res: Response) => {
  const memberships = await membershipRepository.find({ relations: ["department"] });
  res.json(memberships);
};

export const getMembershipById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const membership = await membershipRepository.findOneOrFail({
      where: { id: parseInt(req.params.id, 10) },
      relations: ["department"],
    });
    res.json(membership);
  } catch {
    res.status(404).json({ error: "Membership not found" });
  }
};

export const createMembership = async (req: Request, res: Response, next: NextFunction) => {
  const membership = membershipRepository.create(req.body);

  const errors = await validateEntity(membership);
  if (errors.length > 0) {
    return next(errors);
  }

  await membershipRepository.save(membership);
  res.status(201).json(membership);
};

export const updateMembership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const membership = await membershipRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });

    membershipRepository.merge(membership, req.body);

    const errors = await validateEntity(membership);
    if (errors.length > 0) {
      return next(errors);
    }

    await membershipRepository.save(membership);
    res.json(membership);
  } catch {
    res.status(404).json({ error: "Membership not found" });
  }
};

export const deleteMembership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const membership = await membershipRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });
    await membershipRepository.remove(membership);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Membership not found" });
  }
};
