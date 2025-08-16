import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/data-source";
import { Event } from "../entities/OldEvent";
import { validateEntity } from "../utils/validate";

const eventRepository = AppDataSource.getRepository(Event);

export const listEvents = async (req: Request, res: Response) => {
  const events = await eventRepository.find({ relations: ["department"] });
  res.json(events);
};

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventRepository.findOneOrFail({
      where: { id: parseInt(req.params.id, 10) },
      relations: ["department"],
    });
    res.json(event);
  } catch {
    res.status(404).json({ error: "Event not found" });
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const event = eventRepository.create(req.body);

  const errors = await validateEntity(event);
  if (errors.length > 0) {
    return next(errors);
  }

  await eventRepository.save(event);
  res.status(201).json(event);
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });

    eventRepository.merge(event, req.body);

    const errors = await validateEntity(event);
    if (errors.length > 0) {
      return next(errors);
    }

    await eventRepository.save(event);
    res.json(event);
  } catch {
    res.status(404).json({ error: "Event not found" });
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await eventRepository.findOneOrFail({ where: { id: parseInt(req.params.id, 10) } });
    await eventRepository.remove(event);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Event not found" });
  }
};
