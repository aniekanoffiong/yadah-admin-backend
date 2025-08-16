import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.name === "EntityNotFound") {
    return res.status(404).json({ error: "Resource not found" });
  }
  
  if (Array.isArray(err) && err[0]?.constraints) {
    // class-validator error
    return res.status(400).json({
      errors: err.map(e => Object.values(e.constraints)).flat(),
    });
  }

  res.status(500).json({ error: "Internal Server Error" });
};
