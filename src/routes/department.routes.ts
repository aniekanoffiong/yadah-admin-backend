import { Router } from "express";
import {
  listDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller";
import { adminAuth } from "../middlewares/authentication.middleware";

const router = Router();

router.get("/", listDepartments);
router.get("/:id", getDepartmentById);
router.post("/", adminAuth, createDepartment);
router.patch("/:id", adminAuth, updateDepartment);
router.delete("/:id", adminAuth, deleteDepartment);

export default router;
