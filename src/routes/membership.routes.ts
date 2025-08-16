import { Router } from "express";
import {
  listMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
} from "../controllers/membership.controller";
import { adminAuth } from "../middlewares/authentication.middleware";

const router = Router();

router.get("/", listMemberships);
router.get("/:id", getMembershipById);
router.post("/", adminAuth, createMembership);
router.patch("/:id", adminAuth, updateMembership);
router.delete("/:id", adminAuth, deleteMembership);

export default router;
