import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err, err.status, err.messagew);
  const errStatus = err.status
  const errMessage = err.message

  if (err.name === "EntityNotFound") {
    return res.status(404).json({ error: "Resource not found" });
  }
  
  if (Array.isArray(err) && err[0]?.constraints) {
    // class-validator error
    return res.status(errStatus ?? 400).json({
      errors: err.map(e => Object.values(e.constraints)).flat(),
    });
  }

  res.status(errStatus ?? 500).json({ error: errMessage || "Internal Server Error" });
};
