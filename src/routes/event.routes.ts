import { Router } from "express";
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import { adminAuth } from "../middlewares/authentication.middleware";

const router = Router();

router.get("/", listEvents);
router.get("/:id", getEventById);
router.post("/", adminAuth, createEvent);
router.patch("/:id", adminAuth, updateEvent);
router.delete("/:id", adminAuth, deleteEvent);

export default router;
